import { expect, test } from '@playwright/test'

const products = ['feature-validation', 'ai-candidate-review', 'project-setting', 'worklog-review', 'qa', 'schedule', 'developer-status', 'api-usage', 'report', 'rag-assistant', 'permission', 'meeting-log', 'version-log', 'wiki', 'operations']

test.beforeEach(async ({ page }) => {
  await page.route('https://static.cloudflareinsights.com/**', route => route.abort())
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

for (const width of [390, 768, 1024, 1440]) {
  test(`product title text remains inside its column at ${width}px`, async ({ page }) => {
    test.setTimeout(90_000) // Fifteen complete route entries share this viewport check.
    await page.setViewportSize({ width, height: 900 })
    for (const product of products) {
      await page.goto(`/what/${product}`, { waitUntil: 'domcontentloaded' })
      await page.locator('main h1').waitFor()
      await page.evaluate(() => document.fonts.ready)
      const overflow = await page.locator('main h1').evaluate(heading => {
        const column = heading.parentElement!.getBoundingClientRect()
        return Array.from(heading.querySelectorAll('span')).flatMap(line => {
          const range = document.createRange()
          range.selectNodeContents(line)
          const ink = range.getBoundingClientRect()
          return ink.right > Math.min(column.right, document.documentElement.clientWidth) + 1 || ink.left < column.left - 1
            ? [{ text: line.textContent, right: ink.right, columnRight: column.right, left: ink.left, columnLeft: column.left }]
            : []
        })
      })
      expect(overflow, `${product} at ${width}px`).toEqual([])
    }
  })
}

for (const width of [390, 768]) {
  test(`product back links stay below the wordmark at ${width}px`, async ({ page }) => {
    test.setTimeout(90_000)
    await page.setViewportSize({ width, height: 844 })
    for (const product of products) {
      await page.goto(`/what/${product}`, { waitUntil: 'domcontentloaded' })
      const back = page.locator('main a').first()
      await expect(back).toBeVisible()
      const mark = await page.locator('.wordmark').boundingBox()
      const target = await back.boundingBox()
      expect(target!.y, product).toBeGreaterThan(mark!.y + mark!.height + 8)
      await expect(back).toBeInViewport()
    }
  })
}

test('the first Tab reveals a working skip-to-content link', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: '본문으로 건너뛰기', exact: true })
  await expect(skip).toBeFocused()
  await expect(skip).toBeInViewport()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('the mobile notice does not cover the final related link', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/what/worklog-review')
  const finalLink = page.locator('main footer a').last()
  await finalLink.scrollIntoViewIfNeeded()
  await expect(finalLink).toBeInViewport()
  expect(await finalLink.evaluate(element => {
    const r = element.getBoundingClientRect()
    const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)
    return hit === element || element.contains(hit)
  })).toBe(true)
})
