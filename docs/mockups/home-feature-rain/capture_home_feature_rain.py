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


def assert_stable_target(page: Page, locator: Locator) -> None:
    before = locator.bounding_box()
    page.wait_for_timeout(450)
    after = locator.bounding_box()
    assert before and after
    assert abs(before["x"] - after["x"]) < 0.5
    assert abs(before["y"] - after["y"]) < 0.5


def open_mobile_what(page: Page) -> Locator:
    page.touchscreen.tap(56, 190)
    page.wait_for_timeout(480)
    poster = page.locator(".mobile-diagonal-poster")
    assert poster.get_attribute("data-active-lane") == "what-i-built"
    return page.locator(
        ".mobile-poster-content--what-i-built .poster-index-link"
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

        rain = page.locator(".feature-rain--desktop")
        assert rain.get_attribute("aria-hidden") == "true"
        assert rain.locator("a").count() == 0

        what_field = page.locator(".poster-field--what-i-built")
        what_field.hover()
        page.wait_for_timeout(480)
        stable_links = what_field.locator(".poster-index-link")
        assert stable_links.count() == EXPECTED_FEATURE_COUNT
        page.screenshot(path=str(OUTPUT_DIR / "02-desktop-what-index.png"))

        first_link = stable_links.first
        first_link.hover()
        page.wait_for_timeout(200)
        assert float(first_link.evaluate("el => getComputedStyle(el).opacity")) == 1
        assert first_link.bounding_box()["height"] >= 40
        assert_stable_target(page, first_link)
        animation_states = what_field.locator(".feature-rain-track").evaluate_all(
            "tracks => tracks.map(track => getComputedStyle(track).animationPlayState)"
        )
        assert animation_states and set(animation_states) == {"paused"}
        page.screenshot(path=str(OUTPUT_DIR / "03-desktop-feature-hover.png"))

        page.reload(wait_until="networkidle")
        what_field = page.locator(".poster-field--what-i-built")
        what_field.focus()
        page.keyboard.press("Tab")
        assert page.locator(":focus").inner_text() == "REPORT"
        focused_target = page.locator(":focus")
        assert_stable_target(page, focused_target)
        assert set(
            what_field.locator(".feature-rain-track").evaluate_all(
                "tracks => tracks.map(track => getComputedStyle(track).animationPlayState)"
            )
        ) == {"paused"}

        keyboard_sequence = ["REPORT"]
        for _ in range(EXPECTED_FEATURE_COUNT - 1):
            page.keyboard.press("Tab")
            keyboard_sequence.append(page.locator(":focus").inner_text())
        assert keyboard_sequence[-1] == "DEVELOPER STATUS"

        accessibility_snapshot = what_field.aria_snapshot()
        assert accessibility_snapshot.count("FEATURE VALIDATION") == 1
        assert "RECONSTRUCTED" not in accessibility_snapshot
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
            mobile_links = open_mobile_what(mobile_page)
            assert mobile_links.count() == EXPECTED_FEATURE_COUNT
            assert mobile_links.first.bounding_box()["height"] >= 44
            assert_stable_target(mobile_page, mobile_links.first)

            if width == 390:
                mobile_page.screenshot(
                    path=str(OUTPUT_DIR / "04-mobile-what-index.png")
                )
                mobile_links.filter(has_text="FEATURE VALIDATION").tap()
                mobile_page.wait_for_url("**/what/feature-validation")
                assert mobile_page.locator("main.feature-validation-page").count() == 1

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
        assert keyboard_page.locator(":focus").inner_text() == "REPORT"
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
            path=str(OUTPUT_DIR / "05-reduced-motion-static-index.png")
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
