from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:4173/what/project-setting"
OUTPUT_DIR = Path(__file__).resolve().parent


def assert_no_horizontal_overflow(page, label: str) -> None:
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


def activate_and_capture(page, hotspot_id: str, filename: str, expected: str) -> None:
    hotspot = page.locator(f'[data-hotspot="{hotspot_id}"]')
    hotspot.focus()
    page.wait_for_timeout(100)
    assert hotspot.get_attribute("aria-pressed") == "true"
    assert expected in page.locator("#product-editorial-note").inner_text()
    page.locator(".product-inspection-frame").screenshot(
        path=str(OUTPUT_DIR / filename)
    )


def run() -> None:
    console_errors: list[str] = []
    analytics_errors: list[str] = []
    page_errors: list[str] = []

    def record_console_error(message) -> None:
        if message.type != "error":
            return
        location_url = message.location.get("url", "")
        if "cloudflareinsights.com" in location_url or "cloudflareinsights.com" in message.text:
            analytics_errors.append(message.text)
            return
        console_errors.append(message.text)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        desktop = browser.new_context(
            viewport={"width": 1440, "height": 1000}, device_scale_factor=1
        )
        page = desktop.new_page()
        page.on("console", record_console_error)
        page.on("pageerror", lambda error: page_errors.append(str(error)))
        page.goto(BASE_URL, wait_until="networkidle")

        print(
            {
                "title": page.locator("h1").inner_text(),
                "hotspots": page.locator("[data-hotspot]").count(),
                "related_links": page.locator(".ps-related > a").count(),
            }
        )
        assert page.locator("h1").inner_text() == "PROJECT\nSETTING"
        assert page.locator("[data-hotspot]").count() == 5
        assert page.locator("button button").count() == 0
        assert page.locator(".ps-related > a").count() == 2
        assert page.locator(".ps-related > div").count() == 1
        assert_no_horizontal_overflow(page, "desktop")

        accessibility_snapshot = page.locator(
            ".product-inspection-frame"
        ).aria_snapshot()
        assert "Stable project identity and editable label 설계 설명 보기" in accessibility_snapshot
        assert "Project restore revalidation 설계 설명 보기" in accessibility_snapshot
        assert "WORKSPACE" not in accessibility_snapshot

        for path, page_selector in (
            ("/what/ai-candidate-review", "main.ai-candidate-review-page"),
            ("/how/documentation-system", "main.documentation-page"),
        ):
            related_page = desktop.new_page()
            related_page.goto(f"http://127.0.0.1:4173{path}", wait_until="networkidle")
            assert related_page.locator(page_selector).count() == 1
            related_page.close()

        page.screenshot(path=str(OUTPUT_DIR / "01-hero-product-view.png"))
        page.locator(".product-inspection-frame").screenshot(
            path=str(OUTPUT_DIR / "02-product-view-default.png")
        )
        activate_and_capture(
            page,
            "stable-identity",
            "03-stable-identity-annotation-active.png",
            "시스템의 연결 키를 분리",
        )
        activate_and_capture(
            page,
            "existing-row",
            "04-existing-row-annotation-active.png",
            "새 row 생성은 아니다",
        )
        activate_and_capture(
            page,
            "shared-order",
            "05-shared-order-annotation-active.png",
            "로컬 취향으로 남기지 않았다",
        )
        activate_and_capture(
            page,
            "archive-provenance",
            "06-archive-provenance-annotation-active.png",
            "과거를 해석하지 않는다",
        )
        activate_and_capture(
            page,
            "restore-guard",
            "07-restore-guard-annotation-active.png",
            "단순 toggle이 아니다",
        )

        page.locator(".ps-workflow-section").screenshot(
            path=str(OUTPUT_DIR / "08-workflow.png")
        )
        page.locator(".ps-evolution").screenshot(
            path=str(OUTPUT_DIR / "09-evolution.png")
        )
        page.locator(".ps-evidence").screenshot(
            path=str(OUTPUT_DIR / "10-evidence-status.png")
        )
        page.locator(".ps-boundary").screenshot(
            path=str(OUTPUT_DIR / "10-boundary.png")
        )

        tablet = browser.new_context(viewport={"width": 768, "height": 1024})
        tablet_page = tablet.new_page()
        tablet_page.goto(BASE_URL, wait_until="networkidle")
        assert_no_horizontal_overflow(tablet_page, "tablet")
        tablet.close()

        mobile = browser.new_context(
            viewport={"width": 390, "height": 844},
            device_scale_factor=1,
            has_touch=True,
        )
        mobile_page = mobile.new_page()
        mobile_page.on("console", record_console_error)
        mobile_page.on("pageerror", lambda error: page_errors.append(str(error)))
        mobile_page.goto(BASE_URL, wait_until="networkidle")
        assert_no_horizontal_overflow(mobile_page, "mobile")
        mobile_page.evaluate("document.documentElement.style.scrollBehavior = 'auto'")
        mobile_page.locator(".product-inspection-surface").evaluate(
            "element => element.scrollIntoView({ block: 'start' })"
        )
        mobile_page.wait_for_timeout(80)
        mobile_page.screenshot(path=str(OUTPUT_DIR / "11-mobile-product-view.png"))

        mobile_page.locator('[data-hotspot="archive-provenance"]').tap()
        mobile_page.locator("#product-editorial-note").evaluate(
            "element => element.scrollIntoView({ block: 'start' })"
        )
        mobile_page.wait_for_timeout(80)
        assert "과거를 해석하지 않는다" in mobile_page.locator(
            "#product-editorial-note"
        ).inner_text()
        mobile_page.screenshot(path=str(OUTPUT_DIR / "12-mobile-annotation-state.png"))
        mobile.close()

        narrow = browser.new_context(viewport={"width": 360, "height": 800})
        narrow_page = narrow.new_page()
        narrow_page.goto(BASE_URL, wait_until="networkidle")
        assert_no_horizontal_overflow(narrow_page, "narrow mobile")
        narrow.close()

        reduced = browser.new_context(
            viewport={"width": 390, "height": 844}, reduced_motion="reduce"
        )
        reduced_page = reduced.new_page()
        reduced_page.goto(BASE_URL, wait_until="networkidle")
        transition_duration = reduced_page.locator(
            '[data-hotspot="stable-identity"]'
        ).evaluate("element => getComputedStyle(element).transitionDuration")
        assert transition_duration == "0s"
        reduced.close()

        assert not console_errors, console_errors
        assert not page_errors, page_errors
        desktop.close()
        browser.close()

    print(
        {
            "status": "PASS",
            "screenshots": len(list(OUTPUT_DIR.glob("[0-9][0-9]-*.png"))),
            "console_errors": console_errors,
            "ignored_local_analytics_errors": len(analytics_errors),
            "page_errors": page_errors,
        }
    )


if __name__ == "__main__":
    run()
