import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('https://static.cloudflareinsights.com/**', (route) => route.abort())
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

test.describe('mobile selection feedback', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true })

  for (const surface of [
    { route: '/how/ai-native-engineering', items: '.ai-native-steps li', panel: '#ai-native-step-panel' },
    { route: '/how/security-operations', items: '.so-deploy-flow li', panel: '#so-deploy-annotation' },
    { route: '/how/documentation-system/artifacts/codemap', items: '.codemap-node-rail li', panel: '#codemap-inspection' },
  ]) {
    for (const index of [0, 1, 2]) {
      test(`${surface.route} item ${index + 1} keeps a nearby explicit route to its description`, async ({ page }) => {
        await page.goto(surface.route)
        const item = page.locator(surface.items).nth(index)
        const control = item.locator('button')
        await control.scrollIntoViewIfNeeded()
        const before = await page.evaluate(() => scrollY)
        await control.tap()
        await expect(control).toHaveAttribute('aria-pressed', 'true')
        const jump = item.getByRole('link', { name: '선택한 설명 보기' })
        await expect(jump).toBeInViewport()
        expect(Math.abs(await page.evaluate(() => scrollY) - before)).toBeLessThan(100)
        await jump.tap()
        await expect(page.locator(surface.panel)).toBeFocused()
        await expect(page.locator(surface.panel)).toBeInViewport()
      })
    }
  }

  for (const route of [
    'feature-validation', 'ai-candidate-review', 'project-setting', 'worklog-review',
    'qa', 'schedule', 'report', 'rag-assistant', 'permission', 'meeting-log', 'version-log', 'wiki',
  ]) {
    test(`${route} product selection offers a visible description action without moving the reader`, async ({ page }) => {
      await page.goto(`/what/${route}`)
      const frame = page.locator('.product-inspection-frame').first()
      const control = frame.locator('.product-hotspot').first()
      await control.scrollIntoViewIfNeeded()
      const before = await page.evaluate(() => scrollY)
      await control.tap()
      await expect(control).toHaveAttribute('data-active', 'true')
      const jump = frame.getByRole('link', { name: '선택한 설명 보기' })
      await expect(jump).toBeInViewport()
      expect(Math.abs(await page.evaluate(() => scrollY) - before)).toBeLessThan(100)
      await jump.tap()
      await expect(page.locator('#product-editorial-note')).toBeFocused()
      await expect(page.locator('#product-editorial-note h3')).toBeInViewport()
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    })
  }

  test('permission role defaults keep their explanation within reach after a second selection', async ({ page }) => {
    await page.goto('/what/permission')
    const frame = page.locator('.product-inspection-frame')
    await frame.locator('[data-hotspot="identity-link"]').tap()
    const roleDefaults = frame.locator('[data-hotspot="role-default"]')
    await roleDefaults.scrollIntoViewIfNeeded()
    const before = await page.evaluate(() => scrollY)
    await roleDefaults.tap()
    const jump = frame.getByRole('link', { name: '선택한 설명 보기' })
    await expect(jump).toBeInViewport()
    expect(Math.abs(await page.evaluate(() => scrollY) - before)).toBeLessThan(100)
    await jump.tap()
    await expect(page.locator('#product-editorial-note')).toBeFocused()
    await expect(page.locator('#product-editorial-note h3')).toBeInViewport()
    await expect(roleDefaults).toHaveAttribute('data-active', 'true')
  })
})

test('a keyboard reader can open a product explanation while hover alone adds no jump action', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/what/permission')
  const frame = page.locator('.product-inspection-frame')
  const control = frame.locator('[data-hotspot="role-default"]')
  await control.hover()
  await expect(frame.getByRole('link', { name: '선택한 설명 보기' })).toHaveCount(0)
  await control.focus()
  await control.press('Enter')
  const jump = frame.getByRole('link', { name: '선택한 설명 보기' })
  await jump.focus()
  await jump.press('Enter')
  await expect(page.locator('#product-editorial-note')).toBeFocused()
  await expect(page.locator('#product-editorial-note h3')).toBeInViewport()
})

test('a narrow mouse viewport keeps the pinned explanation available while crossing another hotspot', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/what/permission')
  const frame = page.locator('.product-inspection-frame')
  const roleDefaults = frame.locator('[data-hotspot="role-default"]')
  await roleDefaults.click()
  const selectedHeading = await page.locator('#product-editorial-note h3').textContent()
  const jump = frame.getByRole('link', { name: '선택한 설명 보기' })
  await expect(jump).toBeInViewport()

  // Moving from the selected row to the surface footer crosses a second hotspot.
  await frame.locator('[data-hotspot="personal-override"]').hover()
  await expect(jump).toBeInViewport()
  await expect(roleDefaults).toHaveAttribute('data-active', 'true')
  await jump.click()
  await expect(page.locator('#product-editorial-note')).toBeFocused()
  await expect(page.locator('#product-editorial-note h3')).toHaveText(selectedHeading!)
  await page.keyboard.press('Escape')
  await expect(jump).toHaveCount(0)
})

for (const width of [390, 1440]) {
  for (const surface of [
    { route: 'report', context: '.report-document, .report-head > div, .product-hotspot' },
    { route: 'worklog-review', context: '.wl-queue, .wl-detail-head, .product-hotspot' },
    { route: 'permission', context: '.permission-effective-card, .permission-member-list, .permission-head, .product-hotspot' },
  ]) {
    test(`${surface.route} selection preserves readable surrounding context at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(`/what/${surface.route}`)
      const frame = page.locator('.product-inspection-frame').first()
      await frame.locator('.product-hotspot').first().click()
      const opacities = await frame.locator(surface.context).evaluateAll((elements) => elements.map((element) => {
        let opacity = 1
        for (let current: Element | null = element; current; current = current.parentElement) {
          opacity *= Number(getComputedStyle(current).opacity)
        }
        return opacity
      }))
      expect(Math.min(...opacities)).toBeGreaterThanOrEqual(0.85)
      await expect(frame.locator('.product-hotspot[data-active="true"]')).toHaveCSS('box-shadow', /rgb/)
    })
  }
}
