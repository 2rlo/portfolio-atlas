import { expect, test, type Locator, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('https://static.cloudflareinsights.com/**', (route) => route.abort())
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

async function expectUnobstructed(link: Locator) {
  await expect(link).toBeVisible()
  await expect(link).toBeInViewport()
  expect(await link.evaluate((element) => {
    const rect = element.getBoundingClientRect()
    const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
    return hit === element || element.contains(hit)
  })).toBe(true)
}

for (const viewport of [{ width: 800, height: 400 }, { width: 740, height: 360 }]) {
  test(`landscape HOW exposes all four routes to Tab at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/')
    await page.locator('.poster-field-background-link').focus()
    const links = page.locator('.poster-index-list a')
    await expect(links).toHaveCount(4)
    for (const link of await links.all()) {
      await page.keyboard.press('Tab')
      await expect(link).toBeFocused()
      await expectUnobstructed(link)
    }
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/how/security-operations')
  })
}

test('landscape HOW exposes an individually clickable destination on hover', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 400 })
  await page.goto('/')
  await page.locator('.poster-field--how-i-build').hover({ position: { x: 200, y: 140 } })
  const link = page.locator('.poster-index-list').getByRole('link', { name: 'Technical Writing' })
  await expectUnobstructed(link)
  await link.click()
  await expect(page).toHaveURL('/how/technical-writing')
})

async function clickMobileWord(page: Page, lane: 'what-i-built' | 'how-i-build') {
  const word = page.locator(`.mobile-poster-content--${lane} .mobile-poster-word`)
  const box = await word.boundingBox()
  expect(box).toBeTruthy()
  await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2)
}

for (const path of ['/', '/toss']) {
  test(`mobile WHAT and HOW repeated activation collapse without navigating on ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(path)
    const poster = page.locator('.mobile-diagonal-poster')
    for (const lane of ['what-i-built', 'how-i-build'] as const) {
      await clickMobileWord(page, lane)
      await expect(poster).toHaveAttribute('data-active-lane', lane)
      await clickMobileWord(page, lane)
      await expect(page).toHaveURL(path)
      await expect(poster).toHaveAttribute('data-active-lane', 'none')
    }
    const howControl = page.locator('.mobile-poster-control--how-i-build')
    await howControl.focus()
    await page.keyboard.press('Enter')
    await expect(howControl).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Space')
    await expect(howControl).toHaveAttribute('aria-expanded', 'false')
    await page.keyboard.press('Enter')
    await page.locator('.mobile-poster-index').getByRole('link', { name: 'AI-native Engineering' }).click()
    await expect(page).toHaveURL('/how/ai-native-engineering')
  })
}

test('the WHAT index offers all fifteen public cases and opens them directly', async ({ page }) => {
  await page.goto('/what')
  const links = page.locator('main a[href^="/what/"]')
  await expect(links).toHaveCount(15)
  const destinations = await links.evaluateAll((items) => items.map((item) => item.getAttribute('href')!))
  expect(new Set(destinations).size).toBe(15)
  for (const href of destinations) {
    await page.locator(`main a[href="${href}"]`).click()
    await expect(page).toHaveURL(href)
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page.locator('main')).not.toContainText('WORK IN PROGRESS')
    await page.goBack()
    await expect(links).toHaveCount(15)
  }
})

for (const viewport of [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
]) {
  test(`WHAT index remains readable and keyboard accessible at ${viewport.width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport)
    await page.goto('/what')
    await page.evaluate(() => document.fonts.ready)
    const links = page.locator('main a[href^="/what/"]')
    await expect(links).toHaveCount(15)
    for (const link of await links.all()) {
      await link.focus()
      await expectUnobstructed(link)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(await page.locator('h1 span').evaluateAll((lines) => lines.every((line) => {
      const range = document.createRange()
      range.selectNodeContents(line)
      const rect = range.getBoundingClientRect()
      return rect.left >= 0 && rect.right <= innerWidth
    }))).toBe(true)
    await page.evaluate(() => scrollTo(0, 0))
    await page.screenshot({ path: testInfo.outputPath('what-index.png'), fullPage: true })
  })
}

test.describe('touch landscape HOW disclosure', () => {
  test.use({ hasTouch: true, viewport: { width: 800, height: 400 } })

  test('background activation reveals and collapses the index without leaving Home', async ({ page }) => {
    await page.goto('/')
    const control = page.locator('.poster-field-background-link')
    await control.tap({ position: { x: 100, y: 140 } })
    await expect(page).toHaveURL('/')
    await expect(control).toHaveAttribute('aria-expanded', 'true')
    await expectUnobstructed(page.locator('.poster-index-list a').last())
    await control.tap({ position: { x: 100, y: 140 } })
    await expect(control).toHaveAttribute('aria-expanded', 'false')
    await control.press('Enter')
    await expect(control).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Tab')
    await expect(page.locator('.poster-index-list a').first()).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(control).toBeFocused()
    await expect(control).toHaveAttribute('aria-expanded', 'false')
  })
})
