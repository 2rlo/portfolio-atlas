import { expect, test, type Locator, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Third-party analytics must not delay local UI and route checks.
  await page.route('https://static.cloudflareinsights.com/**', (route) => route.abort())
})

async function openWhat(page: Page, mobile = false) {
  if (mobile) {
    await page.locator('.mobile-poster-control--what-i-built').click({ position: { x: 24, y: 180 } })
    return page.locator('.feature-navigation--mobile')
  }
  await page.locator('#what-i-built').focus()
  return page.locator('.feature-navigation--desktop')
}

async function assertMoving(nav: Locator) {
  const track = nav.locator('.feature-rain-track').first()
  await expect(track).toHaveCSS('animation-play-state', 'running')
  await expect(track).not.toHaveCSS('animation-name', 'none')
  const initial = await track.evaluate((element) => getComputedStyle(element).transform)
  await expect.poll(() => track.evaluate((element) => getComputedStyle(element).transform)).not.toBe(initial)
}

async function assertIndexUsable(page: Page, nav: Locator) {
  const links = nav.locator('.feature-index-link')
  await expect(links).toHaveCount(15)
  await expect(nav.locator('.feature-rain-track')).toHaveCount(0)
  const title = page.locator('.seam-poster:visible .poster-field--what-i-built .poster-word, .mobile-diagonal-poster:visible .mobile-poster-content--what-i-built .mobile-poster-word')
  const titleBox = await title.boundingBox()
  const indexBox = await nav.locator('.feature-index').boundingBox()
  expect(titleBox && indexBox && titleBox.y + titleBox.height <= indexBox.y).toBeTruthy()
  for (const link of await links.all()) {
    await link.focus()
    await expect(link).toBeInViewport()
    expect(await link.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
      return hit === element || element.contains(hit)
    })).toBe(true)
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  expect(overflow).toBe(false)
}

test('reduced motion shows an accessible index and explicit keyboard opt-in really animates', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const nav = await openWhat(page)
  await assertIndexUsable(page, nav)
  const on = nav.getByRole('button', { name: '움직임 켜기', exact: true })
  await on.focus()
  await on.press('Enter')
  const off = nav.getByRole('button', { name: '움직임 끄기', exact: true })
  await expect(off).toBeFocused()
  await assertMoving(nav)
  await off.press('Space')
  await expect(on).toBeFocused()
  await page.mouse.move(-10, -10)
  await expect(nav).toBeVisible()
  await expect(nav.locator('.feature-index-link')).toHaveCount(15)
})

for (const reducedMotion of ['reduce', 'no-preference'] as const) {
  test(`pointer toggle releases the cover on mouse leave with ${reducedMotion}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion })
    await page.goto('/')
    const field = page.locator('#what-i-built')
    const nav = page.locator('.feature-navigation--desktop')
    await field.hover({ position: { x: 30, y: 150 } })
    if (reducedMotion === 'reduce') {
      await nav.getByRole('button', { name: '움직임 켜기' }).click()
    }
    await nav.getByRole('button', { name: '움직임 끄기' }).click()
    await expect(nav.locator('.feature-index')).toBeVisible()
    await page.mouse.move(-10, -10)
    await expect.poll(() => field.evaluate((element) => element.matches(':hover'))).toBe(false)
    await expect(nav).toBeHidden()
    await expect.poll(() => page.evaluate(() => {
      const what = document.querySelector('#what-i-built')!.getBoundingClientRect()
      const how = document.querySelector('#how-i-build')!.getBoundingClientRect()
      return Math.abs(what.width - how.width)
    })).toBeLessThan(1)
    await field.hover({ position: { x: 30, y: 150 } })
    await expect(nav.locator('.feature-index-link')).toHaveCount(15)
    await expect(nav.getByRole('button', { name: '움직임 켜기' })).toBeVisible()
  })
}

test('ordinary motion keeps rain and pause behavior, with a working stop control', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const nav = page.locator('.feature-navigation--desktop')
  await page.locator('#what-i-built').hover({ position: { x: 30, y: 150 } })
  await assertMoving(nav)
  const hit = await nav.locator('.feature-rain-link').evaluateAll((links) => {
    for (const link of links) {
      const rect = link.getBoundingClientRect()
      const x = rect.x + rect.width / 2
      const y = rect.y + rect.height / 2
      if (y > 150 && y < innerHeight - 150 && document.elementFromPoint(x, y) === link) {
        return { x, y, lane: link.closest('.feature-rain-lane')!.getAttribute('data-rain-lane') }
      }
    }
    return null
  })
  expect(hit).toBeTruthy()
  await page.mouse.move(hit!.x, hit!.y)
  await expect(nav.locator(`[data-rain-lane="${hit!.lane}"] .feature-rain-track`)).toHaveCSS('animation-play-state', 'paused')
  await nav.getByRole('button', { name: '움직임 끄기' }).click()
  await assertIndexUsable(page, nav)
  await nav.getByRole('button', { name: '움직임 켜기' }).click()
  await assertMoving(nav)
  await nav.getByRole('button', { name: '움직임 끄기' }).focus()
  await page.keyboard.press('Tab')
  await expect(nav.locator('.feature-rain-track').first()).toHaveCSS('animation-name', 'none')
  await expect(nav.locator('.feature-rain-link:focus')).toHaveText('REPORT')
})

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 1234, height: 676 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 320, height: 568 },
  { width: 740, height: 360 },
]) {
  test(`all static destinations remain reachable at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    const mobile = viewport.width <= 820 && viewport.height > viewport.width
    await page.setViewportSize(viewport)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const nav = await openWhat(page, mobile)
    await assertIndexUsable(page, nav)
    await nav.locator('.feature-index-link').first().focus()
    await page.screenshot({ path: testInfo.outputPath('index.png') })
    await nav.getByRole('button', { name: '움직임 켜기' }).click()
    await assertMoving(nav)
    await nav.getByRole('button', { name: '움직임 끄기' }).click()
    await nav.getByRole('link', { name: 'DEVELOPER STATUS', exact: true }).click()
    await expect(page).toHaveURL('/what/developer-status')
  })
}

test('mode is shared across breakpoints, resets on system changes and reload, and preserves focus', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const desktop = await openWhat(page)
  await desktop.getByRole('button', { name: '움직임 켜기' }).click()
  await page.setViewportSize({ width: 390, height: 844 })
  const mobile = await openWhat(page, true)
  await expect(mobile.getByRole('button', { name: '움직임 끄기' })).toBeVisible()
  await mobile.getByRole('button', { name: '움직임 끄기' }).click()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(mobile.getByRole('button', { name: '움직임 끄기' })).toBeVisible()
  await mobile.locator('[data-rain-copy="0"] .feature-rain-link').first().focus()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(mobile.getByRole('button', { name: '움직임 켜기' })).toBeFocused()
  await mobile.getByRole('button', { name: '움직임 켜기' }).click()
  await page.reload()
  await openWhat(page, true)
  await expect(mobile.getByRole('button', { name: '움직임 켜기' })).toBeVisible()
})

test('inactive mobile WHAT hides its control and all index links from keyboard navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const nav = await openWhat(page, true)
  await expect(page.getByRole('button', { name: '만든 제품 목록 접기' })).toHaveAttribute('aria-expanded', 'true')
  const howWord = page.locator('.mobile-poster-content--how-i-build .mobile-poster-word')
  const box = await howWord.boundingBox()
  expect(box).toBeTruthy()
  expect(await howWord.evaluate((element) => {
    const rect = element.getBoundingClientRect()
    return document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
      ?.classList.contains('mobile-poster-control--how-i-build')
  })).toBe(true)
  await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2)
  await expect(nav.getByRole('button')).toHaveCount(0)
  await expect(nav.getByRole('link')).toHaveCount(0)
})

test('noninteractive type studies do not reveal the feature index', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/?study=t1')
  await page.locator('#what-i-built').hover({ position: { x: 30, y: 150 } })
  await expect(page.locator('.feature-navigation--desktop')).toBeHidden()
  await expect(page.getByRole('button', { name: /움직임/ })).toHaveCount(0)
})

test.describe('touch landscape', () => {
  test.use({ hasTouch: true, viewport: { width: 740, height: 360 }, reducedMotion: 'reduce' })

  test('toggling motion retains the open navigation without hover', async ({ page }) => {
    await page.goto('/')
    await page.locator('#what-i-built').tap({ position: { x: 30, y: 150 } })
    const nav = page.locator('.feature-navigation--desktop')
    await nav.getByRole('button', { name: '움직임 켜기' }).tap()
    await expect(nav).toBeVisible()
    await expect(nav.getByRole('button', { name: '움직임 끄기' })).toBeFocused()
    await assertMoving(nav)
    await nav.getByRole('button', { name: '움직임 끄기' }).tap()
    await expect(nav.locator('.feature-index')).toBeVisible()
  })
})

test('every static destination opens a real product page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const nav = await openWhat(page)
  const destinations = await nav.locator('.feature-index-link').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')!),
  )
  expect(new Set(destinations).size).toBe(15)
  for (const href of destinations) {
    await nav.locator(`a[href="${href}"]`).click()
    await expect(page).toHaveURL(href)
    // The router updates the URL before React commits the destination view.
    await expect(page.locator('main h1')).toHaveCount(1)
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page.locator('main')).not.toContainText('페이지를 찾을 수')
    await page.getByRole('link', { name: 'Portfolio Atlas 홈', exact: true }).click()
    await openWhat(page)
  }
})

test('Operations is reachable by keyboard from moving navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const nav = await openWhat(page)
  const operations = nav.locator('[data-rain-copy="0"] [data-feature-id="operations"]')
  await operations.focus()
  await expect(operations).toBeInViewport()
  await operations.press('Enter')
  await expect(page).toHaveURL('/what/operations')
  await expect(page.locator('main h1')).toHaveText('OPERATIONS')
})
