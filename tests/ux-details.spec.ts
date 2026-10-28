import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('https://static.cloudflareinsights.com/**', (route) => route.abort())
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

test('Recovery preview has a shareable address and Back restores its list position', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/what/operations')
  await page.goto('/how/documentation-system')
  const recovery = page.getByRole('button', { name: /03.*RECOVERY/ })
  await recovery.scrollIntoViewIfNeeded()
  const origin = await page.evaluate(() => window.scrollY)
  await recovery.click()
  await expect(page.getByRole('dialog', { name: 'RECOVERY', exact: true })).toBeVisible()
  await expect(page).toHaveURL(/\/how\/documentation-system\?artifact=recovery$/)
  await page.goBack()
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page).toHaveURL('/how/documentation-system')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeCloseTo(origin, -1)
  await expect(recovery).toBeFocused()
  await page.goForward()
  await expect(page.getByRole('dialog', { name: 'RECOVERY', exact: true })).toBeVisible()
  await page.getByRole('button', { name: '문서 상세 닫기' }).click()
  await expect(page).toHaveURL('/how/documentation-system')
  await expect(page.getByRole('dialog')).not.toBeVisible()
})

test('mobile Recovery keeps its close action visible at the end of the document', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/how/documentation-system')
  await page.getByRole('button', { name: /03.*RECOVERY/ }).click()
  const dialog = page.getByRole('dialog', { name: 'RECOVERY', exact: true })
  await dialog.evaluate((element) => { element.scrollTop = element.scrollHeight })
  await expect(page.getByRole('button', { name: '문서 상세 닫기' })).toBeInViewport()
  await page.getByRole('button', { name: '문서 상세 닫기' }).click()
  await expect(dialog).not.toBeVisible()
})

test('a directly opened preview closes to Documentation instead of the preceding page', async ({ page }) => {
  await page.goto('/what/operations')
  await page.goto('/how/documentation-system?artifact=recovery')
  await expect(page.getByRole('dialog', { name: 'RECOVERY', exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page).toHaveURL('/how/documentation-system')
  await expect(page.getByRole('dialog')).not.toBeVisible()
})

test('opening a preview preserves an existing section address and reading position', async ({ page }) => {
  await page.goto('/how/documentation-system?source=library#artifact-section-title')
  const recovery = page.getByRole('button', { name: /03.*RECOVERY/ })
  await recovery.scrollIntoViewIfNeeded()
  const origin = await page.evaluate(() => window.scrollY)
  await recovery.click()
  await expect(page).toHaveURL('/how/documentation-system?source=library&artifact=recovery#artifact-section-title')
  await page.getByRole('button', { name: '문서 상세 닫기' }).click()
  await expect(page).toHaveURL('/how/documentation-system?source=library#artifact-section-title')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeCloseTo(origin, -1)
})

test('a library preview preserves the selected primary document on return', async ({ page }) => {
  await page.goto('/how/documentation-system')
  const recovery = page.getByRole('button', { name: /03.*RECOVERY/ })
  await recovery.click()
  await page.getByRole('button', { name: '문서 상세 닫기' }).click()
  await page.locator('.artifact-library summary').click()
  await page.locator('.artifact-library').getByRole('button', { name: /DATA PIPELINE/ }).click()
  await expect(page.getByRole('dialog', { name: 'DATA PIPELINE', exact: true })).toBeVisible()
  await page.getByRole('button', { name: '문서 상세 닫기' }).click()
  await expect(recovery).toHaveAttribute('aria-current', 'true')
})

test('the Codemap library entry retains its dedicated artifact route', async ({ page }) => {
  await page.goto('/how/documentation-system')
  await page.locator('.artifact-library summary').click()
  await page.locator('.artifact-library').getByRole('link', { name: /CODEMAP/ }).click()
  await expect(page).toHaveURL('/how/documentation-system/artifacts/codemap')
  await expect(page.locator('main h1')).toBeVisible()
})

test('the public AI Review keeps one final workflow without prototype navigation', async ({ page }) => {
  for (const query of ['', '?workflow=sticky', '?workflow=classic']) {
    await page.goto(`/what/ai-candidate-review${query}`)
    await expect(page.getByRole('navigation', { name: 'AI Review 레이아웃 비교' })).toHaveCount(0)
    await expect(page.locator('.acr-journey')).toHaveAttribute('data-polished', 'true')
    await expect(page.locator('.acr-workflow-rail button')).toHaveCount(5)
    await expect(page.locator('.acr-record-execution a')).toHaveAttribute('href', '/what/schedule')
  }
})

for (const entry of [
  { route: '/what/api-usage', prefix: 'api', guide: 'LEDGER GUIDE' },
  { route: '/what/developer-status', prefix: 'dev', guide: 'ROLLUP GUIDE' },
]) {
  test(`${entry.route} names its reset as overall view and reveals the guide`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(entry.route)
    const controls = page.locator(`.${entry.prefix}-lens-controls`)
    const selector = controls.locator('li button').first()
    await selector.click()
    await expect(selector).toHaveAttribute('aria-pressed', 'true')
    await controls.getByRole('button', { name: '전체 보기', exact: true }).click()
    await expect(controls.getByRole('button', { name: '전체 보기', exact: true })).toHaveAttribute('aria-pressed', 'true')
    await expect(selector).toHaveAttribute('aria-pressed', 'false')
    await expect(page.locator('#product-editorial-note')).toContainText(entry.guide)
    const labelSize = await selector.locator('strong').evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize))
    expect(labelSize).toBeGreaterThanOrEqual(12)
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}
