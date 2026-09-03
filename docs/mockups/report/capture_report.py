from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:4173/what/report"
OUTPUT_DIR = Path(__file__).resolve().parent


def assert_no_horizontal_overflow(page, label: str) -> None:
    size = page.evaluate(
        "() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth })"
    )
    assert size["scroll"] <= size["width"], f"{label}: {size}"


def activate(page, hotspot_id: str, filename: str, expected: str) -> None:
    target = page.locator(f'[data-hotspot="{hotspot_id}"]')
    target.focus()
    page.wait_for_timeout(80)
    assert target.get_attribute("aria-pressed") == "true"
    assert expected in page.locator("#product-editorial-note").inner_text()
    page.locator(".product-inspection-frame").screenshot(path=str(OUTPUT_DIR / filename))


def run() -> None:
    console_errors: list[str] = []
    page_errors: list[str] = []

    def on_console(message) -> None:
        if message.type != "error":
            return
        location = message.location.get("url", "")
        if "cloudflareinsights.com" not in location and "cloudflareinsights.com" not in message.text:
            console_errors.append(message.text)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        desktop = browser.new_context(viewport={"width": 1440, "height": 1000})
        page = desktop.new_page()
        page.on("console", on_console)
        page.on("pageerror", lambda error: page_errors.append(str(error)))
        page.goto(BASE_URL, wait_until="networkidle")

        assert page.locator("h1").inner_text() == "WEEKLY\nREPORT"
        assert page.locator("[data-hotspot]").count() == 5
        assert page.locator("button button").count() == 0
        assert_no_horizontal_overflow(page, "desktop")
        snapshot = page.locator(".product-inspection-frame").aria_snapshot()
        assert "Canonical report week and generation metadata 설계 설명 보기" in snapshot
        assert "Reviewed-first report source state and visible fallback 설계 설명 보기" in snapshot

        page.screenshot(path=str(OUTPUT_DIR / "01-hero-product-view.png"))
        page.locator(".product-inspection-frame").screenshot(path=str(OUTPUT_DIR / "02-product-view-default.png"))
        activate(page, "week-window", "03-week-window-active.png", "생성한 날")
        activate(page, "reviewed-source", "04-reviewed-source-active.png", "검토한 기록")
        activate(page, "structured-metrics", "05-structured-metrics-active.png", "다시 셀 수 있는")
        activate(page, "qa-evidence", "06-qa-evidence-active.png", "QA 결과")
        activate(page, "generation-gate", "07-generation-gate-active.png", "같은 source 규칙")
        page.locator(".qa-workflow-section").screenshot(path=str(OUTPUT_DIR / "08-workflow.png"))
        page.locator(".qa-evolution").screenshot(path=str(OUTPUT_DIR / "09-evolution.png"))
        page.locator(".qa-evidence").screenshot(path=str(OUTPUT_DIR / "10-evidence-status.png"))
        page.locator(".qa-boundary").screenshot(path=str(OUTPUT_DIR / "11-boundary.png"))

        for width, height, label in ((768, 1024, "tablet"), (360, 800, "narrow")):
            context = browser.new_context(viewport={"width": width, "height": height})
            check_page = context.new_page()
            check_page.goto(BASE_URL, wait_until="networkidle")
            assert_no_horizontal_overflow(check_page, label)
            context.close()

        mobile = browser.new_context(viewport={"width": 390, "height": 844}, has_touch=True)
        mobile_page = mobile.new_page()
        mobile_page.goto(BASE_URL, wait_until="networkidle")
        assert_no_horizontal_overflow(mobile_page, "mobile")
        mobile_page.evaluate("document.documentElement.style.scrollBehavior = 'auto'")
        mobile_page.locator(".product-inspection-surface").evaluate(
            "element => element.scrollIntoView({ block: 'start' })"
        )
        mobile_page.wait_for_timeout(80)
        mobile_page.screenshot(path=str(OUTPUT_DIR / "12-mobile-product-view.png"))
        mobile_page.locator('[data-hotspot="reviewed-source"]').tap()
        mobile_page.locator("#product-editorial-note").evaluate(
            "element => element.scrollIntoView({ block: 'start' })"
        )
        mobile_page.wait_for_timeout(80)
        assert "검토한 기록" in mobile_page.locator("#product-editorial-note").inner_text()
        mobile_page.screenshot(path=str(OUTPUT_DIR / "13-mobile-annotation-state.png"))
        mobile.close()

        reduced = browser.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
        reduced_page = reduced.new_page()
        reduced_page.goto(BASE_URL, wait_until="networkidle")
        duration = reduced_page.locator('[data-hotspot="week-window"]').evaluate(
            "element => getComputedStyle(element).transitionDuration"
        )
        assert duration == "0s"
        reduced.close()

        assert not console_errors, console_errors
        assert not page_errors, page_errors
        desktop.close()
        browser.close()

    print({"status": "PASS", "screenshots": len(list(OUTPUT_DIR.glob("[0-9][0-9]-*.png")))})


if __name__ == "__main__":
    run()
