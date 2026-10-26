import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('https://static.cloudflareinsights.com/**', (route) => route.abort())
})

test('an eligible recovery decision needs a preview and never claims execution', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/what/operations')
  await page.getByRole('button', { name: '재시도 가능한 실패', exact: true }).click()
  await expect(page.getByRole('button', { name: '로컬 판단 기록', exact: true })).toHaveCount(0)
  const preview = page.getByRole('button', { name: '재시도 판단 미리보기', exact: true })
  await preview.focus()
  await preview.press('Enter')
  await expect(page.getByRole('status')).toContainText('선택한 대상과 비용 영향을 확인하세요.')
  const confirm = page.getByRole('button', { name: '로컬 판단 기록', exact: true })
  await confirm.focus()
  await confirm.press('Space')
  await expect(page.getByRole('status')).toContainText('이 사례에 대한 판단을 기록했습니다.')

  await page.getByRole('button', { name: '누락되거나 오래된 근거', exact: true }).click()
  await expect(preview).toHaveCount(0)
  await expect(confirm).toHaveCount(0)
  await expect(page.getByRole('status')).not.toContainText('이 사례에 대한 판단을 기록했습니다.')

  await page.getByRole('button', { name: '새 작업 중단 · 정산 대기', exact: true }).click()
  await expect(preview).toHaveCount(0)
  await expect(confirm).toHaveCount(0)
  await page.getByRole('button', { name: '재시도 가능한 실패', exact: true }).click()
  await expect(preview).toBeVisible()
  await expect(confirm).toHaveCount(0)
})

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 320, height: 568 },
]) {
  test(`new case study surfaces fit and link correctly at ${viewport.width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const pages = [
      { href: '/what/operations', section: '.operations-inspection', link: '.qa-related a', target: '/how/security-operations' },
      { href: '/what/api-usage', section: '.api-paid-lifecycle', link: '.api-paid-boundary a', target: '/what/operations' },
      { href: '/what/ai-candidate-review', section: '.acr-record-execution', link: '.acr-record-execution a', target: '/what/schedule' },
      { href: '/how/technical-writing', section: '.tw-handover-section', link: '.tw-handover-related', target: '/what/operations' },
    ]
    for (const entry of pages) {
      await page.goto(entry.href)
      const section = page.locator(entry.section)
      await expect(section).toBeVisible()
      await section.scrollIntoViewIfNeeded()
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      const clipped = await section.locator('*').evaluateAll((elements) => elements.filter((element) => {
        const box = element.getBoundingClientRect()
        return box.width > 0 && (box.left < -1 || box.right > innerWidth + 1)
      }).map((element) => element.tagName + '.' + element.className))
      expect(clipped).toEqual([])
      await section.screenshot({ path: testInfo.outputPath(entry.href.split('/').at(-1)! + '.png') })
      await page.locator(entry.link).first().click()
      await expect(page).toHaveURL(entry.target)
      await expect(page.locator('main h1')).toBeVisible()
      await expect(page.locator('main')).not.toContainText('페이지를 찾을 수')
    }
  })
}

test('confirmed-record continuation is available in the classic workflow too', async ({ page }) => {
  await page.goto('/what/ai-candidate-review?workflow=classic')
  await page.locator('.acr-record-execution a').click()
  await expect(page).toHaveURL('/what/schedule')
  await expect(page.locator('main h1')).toBeVisible()
})

test('engineering recovery guidance links back to the Operations product', async ({ page }) => {
  await page.goto('/how/security-operations')
  await page.locator('.so-related-product').click()
  await expect(page).toHaveURL('/what/operations')
  await expect(page.getByRole('button', { name: '누락되거나 오래된 근거', exact: true })).toBeVisible()
})
