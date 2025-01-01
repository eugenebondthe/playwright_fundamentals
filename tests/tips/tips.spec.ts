import { test, expect } from '@playwright/test'

test.describe.only('Tips & tricks section', () => {
  test('TestInfo Object', async ({ page }, testInfo) => {
    await page.goto('https://www.example.com')
    console.log(testInfo.expectedStatus)
  })

  test('Test Skip Browser', async ({ page, browserName }) => {
    test.skip(
      browserName === 'chromium',
      "Feature's not ready for Chrome browser",
    )
    await page.goto('https://www.example.com')
  })

  test('Test Fixme Annotation', async ({ page, browserName }) => {
    test.fixme(
      browserName === 'chromium',
      "Test's not stable, needs refactoring",
    )
    await page.goto('https://www.example.com')
  })

  const people = ['Mike', 'Judy', 'Peter', 'Elon', 'Alice']
  for (const name of people) {
    test(`Running test for ${name}`, async ({ page }) => {
      await page.goto('http://zero.webappsecurity.com/index.html')
      await page.fill('#searchTerm', `${name}`)
      await page.waitForTimeout(3000)
    })
  }

  test('Mouse movement simulation', async ({ page }) => {
    await page.goto('https://www.example.com')
    await page.mouse.move(0, 0)
    await page.mouse.down()
    await page.mouse.move(0, 100)
    await page.mouse.up()
  })

  test('Multiple browser tabs inside 1 browser', async ({ browser }) => {
    const context = await browser.newContext()
    const page1 = await context.newPage()
    const page2 = await context.newPage()
    await page1.goto("https://www.example.com")
    await page2.goto("https://www.example.com")
    await page1.waitForTimeout(5000)
  })
})

// To select retries number we also can use --retries=number flag in the execution script as well as in config
