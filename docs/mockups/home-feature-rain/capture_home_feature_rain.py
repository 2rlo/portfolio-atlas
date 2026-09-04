from pathlib import Path

from playwright.sync_api import Locator, Page, sync_playwright


BASE_URL = "http://127.0.0.1:4173/"
OUTPUT_DIR = Path(__file__).resolve().parent
EXPECTED_FEATURE_COUNT = 14


def assert_no_horizontal_overflow(page: Page, label: str) -> None:
    dimensions = page.evaluate(
        """() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        })"""
    )
    assert dimensions["scrollWidth"] <= dimensions["clientWidth"], (
        f"{label}: horizontal overflow "
        f"{dimensions['scrollWidth']} > {dimensions['clientWidth']}"
    )


def assert_visible_focus_target(page: Page, locator: Locator) -> None:
    box = locator.bounding_box()
    assert box
    assert 0 <= box["y"] < page.viewport_size["height"], box
    animation_name = locator.evaluate(
        "element => getComputedStyle(element.closest('.feature-rain-track')).animationName"
    )
    assert animation_name == "none", animation_name


def expanded_hit_target(page: Page, rain_selector: str) -> dict:
    target = page.evaluate(
        """
        ({ rainSelector, viewportHeight }) => {
          const links = Array.from(document.querySelectorAll(
            `${rainSelector} .feature-rain-link`
          ))
          const link = links.find((candidate) => {
            const rect = candidate.getBoundingClientRect()
            return rect.top > 100
              && rect.bottom < viewportHeight - 100
              && rect.width > 20
          })
          if (!link) return null
          const rect = link.getBoundingClientRect()
          return {
            featureId: link.dataset.featureId,
            href: link.getAttribute('href'),
            x: rect.left + rect.width / 2,
            y: rect.top - 10,
          }
        }
        """,
        {
            "rainSelector": rain_selector,
            "viewportHeight": page.viewport_size["height"],
        },
    )
    assert target
    hit_feature = page.evaluate(
        """
        ({ x, y }) => document.elementFromPoint(x, y)
          ?.closest('.feature-rain-link')
          ?.dataset.featureId ?? null
        """,
        {"x": target["x"], "y": target["y"]},
    )
    assert hit_feature == target["featureId"], (hit_feature, target)
    return target


def open_mobile_what(page: Page) -> Locator:
    page.locator(".mobile-poster-control--what-i-built").click(
        position={"x": 24, "y": 120}
    )
    page.wait_for_timeout(480)
    poster = page.locator(".mobile-diagonal-poster")
    assert poster.get_attribute("data-active-lane") == "what-i-built"
    assert page.locator(
        ".mobile-poster-content--what-i-built .mobile-poster-index"
    ).count() == 0
    return page.locator(
        '.feature-rain--mobile [data-rain-copy="0"] .feature-rain-link'
    )


def run() -> None:
    console_errors: list[str] = []
    analytics_errors: list[str] = []
    page_errors: list[str] = []

    def record_console_error(message) -> None:
        if message.type != "error":
            return
        location_url = message.location.get("url", "")
        if (
            "cloudflareinsights.com" in location_url
            or "cloudflareinsights.com" in message.text
        ):
            analytics_errors.append(message.text)
            return
        console_errors.append(message.text)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)

        desktop = browser.new_context(viewport={"width": 1440, "height": 1000})
        page = desktop.new_page()
        page.on("console", record_console_error)
        page.on("pageerror", lambda error: page_errors.append(str(error)))
        page.goto(BASE_URL, wait_until="networkidle")
        assert_no_horizontal_overflow(page, "desktop")
        page.screenshot(path=str(OUTPUT_DIR / "01-home-default.png"))

        assert page.locator(
            ".poster-field--what-i-built .poster-index-list"
        ).count() == 0
        primary_links = page.locator(
            '.feature-rain--desktop [data-rain-copy="0"] .feature-rain-link'
        )
        duplicate_links = page.locator(
            '.feature-rain--desktop [data-rain-copy="1"] '
            '.feature-rain-link[tabindex="-1"]'
        )
        assert primary_links.count() == EXPECTED_FEATURE_COUNT
        assert duplicate_links.count() == EXPECTED_FEATURE_COUNT

        what_field = page.locator(".poster-field--what-i-built")
        what_field.hover()
        page.wait_for_timeout(480)
        assert page.get_by_role(
            "navigation", name="WHAT I BUILT pages"
        ).count() == 1
        page.screenshot(path=str(OUTPUT_DIR / "02-desktop-what-rain.png"))

        target = expanded_hit_target(page, ".feature-rain--desktop")
        page.mouse.move(target["x"], target["y"])
        page.wait_for_timeout(160)
        target_link = page.locator(
            f'.feature-rain-link[data-feature-id="{target["featureId"]}"]'
        ).first
        assert float(target_link.evaluate("el => getComputedStyle(el).opacity")) > 0.9
        assert target_link.evaluate(
            "element => getComputedStyle(element.closest('.feature-rain-track')).animationPlayState"
        ) == "paused"
        page.screenshot(path=str(OUTPUT_DIR / "03-desktop-feature-hover.png"))

        page.reload(wait_until="networkidle")
        what_field = page.locator(".poster-field--what-i-built")
        what_field.focus()
        page.keyboard.press("Tab")
        focused_target = page.locator(".feature-rain-link:focus")
        assert focused_target.inner_text() == "REPORT"
        assert_visible_focus_target(page, focused_target)

        keyboard_sequence = ["REPORT"]
        for _ in range(EXPECTED_FEATURE_COUNT - 1):
            page.keyboard.press("Tab")
            keyboard_sequence.append(page.locator(":focus").inner_text())
        assert keyboard_sequence[-1] == "DEVELOPER STATUS"

        accessibility_snapshot = what_field.aria_snapshot()
        assert accessibility_snapshot.count("FEATURE VALIDATION") == 1
        desktop.close()

        for label, width, height in (
            ("tablet", 768, 1024),
            ("mobile-390", 390, 844),
            ("mobile-360", 360, 800),
        ):
            context = browser.new_context(
                viewport={"width": width, "height": height}, has_touch=True
            )
            mobile_page = context.new_page()
            mobile_page.on("console", record_console_error)
            mobile_page.on("pageerror", lambda error: page_errors.append(str(error)))
            mobile_page.goto(BASE_URL, wait_until="networkidle")
            assert_no_horizontal_overflow(mobile_page, label)
            assert mobile_page.locator(
                '.feature-rain--mobile[aria-hidden="true"] .feature-rain-link'
            ).count() == 0
            mobile_links = open_mobile_what(mobile_page)
            assert mobile_links.count() == EXPECTED_FEATURE_COUNT

            if width == 390:
                mobile_page.screenshot(
                    path=str(OUTPUT_DIR / "04-mobile-what-rain.png")
                )
                mobile_target = expanded_hit_target(
                    mobile_page, ".feature-rain--mobile"
                )
                mobile_page.touchscreen.tap(
                    mobile_target["x"], mobile_target["y"]
                )
                mobile_page.wait_for_url(f"**{mobile_target['href']}")

            context.close()

        keyboard_mobile = browser.new_context(
            viewport={"width": 768, "height": 1024}
        )
        keyboard_page = keyboard_mobile.new_page()
        keyboard_page.goto(BASE_URL, wait_until="networkidle")
        what_control = keyboard_page.locator(
            ".mobile-poster-control--what-i-built"
        )
        what_control.focus()
        keyboard_page.keyboard.press("Enter")
        keyboard_page.keyboard.press("Tab")
        mobile_focused_target = keyboard_page.locator(
            ".feature-rain--mobile .feature-rain-link:focus"
        )
        assert mobile_focused_target.inner_text() == "REPORT"
        assert_visible_focus_target(keyboard_page, mobile_focused_target)
        keyboard_mobile.close()

        reduced = browser.new_context(
            viewport={"width": 390, "height": 844},
            has_touch=True,
            reduced_motion="reduce",
        )
        reduced_page = reduced.new_page()
        reduced_page.goto(BASE_URL, wait_until="networkidle")
        reduced_links = open_mobile_what(reduced_page)
        animation_names = reduced_page.locator(
            ".feature-rain--mobile .feature-rain-track"
        ).evaluate_all(
            "tracks => tracks.map(track => getComputedStyle(track).animationName)"
        )
        assert animation_names and set(animation_names) == {"none"}
        assert reduced_links.count() == EXPECTED_FEATURE_COUNT
        reduced_page.screenshot(
            path=str(OUTPUT_DIR / "05-reduced-motion-static-rain.png")
        )
        reduced.close()

        assert not console_errors, console_errors
        assert not page_errors, page_errors
        browser.close()

    print(
        {
            "status": "PASS",
            "features": EXPECTED_FEATURE_COUNT,
            "screenshots": len(list(OUTPUT_DIR.glob("[0-9][0-9]-*.png"))),
            "console_errors": console_errors,
            "ignored_local_analytics_errors": len(analytics_errors),
            "page_errors": page_errors,
        }
    )


if __name__ == "__main__":
    run()
