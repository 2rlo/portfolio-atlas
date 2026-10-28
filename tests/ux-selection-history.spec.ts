import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 390, height: 844 }, hasTouch: true })

test.beforeEach(async ({ page }) => {
  await page.route('https://static.cloudflareinsights.com/**', (route) => route.abort())
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

test('Back from a selected product explanation restores the originating reading position', async ({ page }) => {
  await page.goto('/what/permission')
  await page.evaluate(() => document.fonts.ready)
  const frame = page.locator('.product-inspection-frame')
  const control = frame.locator('[data-hotspot="role-default"]')
  await control.scrollIntoViewIfNeeded()
  await control.tap()
  const jump = frame.getByRole('link', { name: '선택한 설명 보기' })
  await expect(jump).toBeInViewport()
  const origin = await page.evaluate(() => scrollY)
  expect(origin).toBeGreaterThan(500)

  await jump.tap()
  await expect(page).toHaveURL('/what/permission#product-editorial-note')
  await expect(page.locator('#product-editorial-note')).toBeFocused()
  await expect(page.locator('#product-editorial-note h3')).toBeInViewport()
  await page.goBack()
  await expect(page).toHaveURL('/what/permission')
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
  await expect.poll(async () => Math.abs(await page.evaluate(() => scrollY) - origin)).toBeLessThan(10)
  await expect(control).toBeInViewport()
})
