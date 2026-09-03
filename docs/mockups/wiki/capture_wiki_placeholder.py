from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:4173/what/wiki"
OUTPUT_DIR = Path(__file__).resolve().parent


def assert_no_horizontal_overflow(page, label: str) -> None:
    size = page.evaluate(
        "() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth })"
    )
    assert size["scroll"] <= size["width"], f"{label}: {size}"


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

        assert page.locator("h1").inner_text() == "Wiki needs its own product evidence."
        assert "독립 제품 화면과 사용 흐름" in page.locator("main").inner_text()
        assert page.locator(".wip-page__back-link").count() == 1
        assert_no_horizontal_overflow(page, "desktop")
        page.screenshot(path=str(OUTPUT_DIR / "01-source-needed-desktop.png"))

        mobile = browser.new_context(viewport={"width": 390, "height": 844}, has_touch=True)
        mobile_page = mobile.new_page()
        mobile_page.goto(BASE_URL, wait_until="networkidle")
        assert_no_horizontal_overflow(mobile_page, "mobile")
        mobile_page.screenshot(path=str(OUTPUT_DIR / "02-source-needed-mobile.png"))
        mobile.close()

        narrow = browser.new_context(viewport={"width": 360, "height": 800})
        narrow_page = narrow.new_page()
        narrow_page.goto(BASE_URL, wait_until="networkidle")
        assert_no_horizontal_overflow(narrow_page, "narrow")
        narrow.close()

        reduced = browser.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
        reduced_page = reduced.new_page()
        reduced_page.goto(BASE_URL, wait_until="networkidle")
        assert reduced_page.locator(".wip-scene img").count() == 1
        assert reduced_page.locator(".wip-scene video").count() == 0
        reduced.close()

        assert not console_errors, console_errors
        assert not page_errors, page_errors
        desktop.close()
        browser.close()

    print({"status": "PASS", "screenshots": 2})


if __name__ == "__main__":
    run()
