import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from '../helpers'

test('Simple basic test', async ({ page }) => {
  await page.goto('https://www.example.com')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test('Clicking on Elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html')
  await page.click('#signin_button')
  await page.click('text=Sign in')

  const errorMessage = await page.locator('.alert-error')
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test('Selectors', async ({ page }) => {
  //text
  await page.click('text=some text')

  //CSS selectors
  await page.click('button')
  await page.click('#id')
  await page.click('.class')

  //only visible CSS selector
  await page.click('.submit-button:visible')

  //combinations
  await page.click('#username .first')

  //XPath
  await page.click('//button')
})

test.describe('My first test suite', () => {
  test('Working with inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')

    await page.fill('#user_login', 'artemiuszk')
    await page.fill('#user_password', 'qwerty12345')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test('Assertions', async ({ page }) => {
    await page.goto('https://example.com')
    await expect(page).toHaveURL('https://example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })
})

test.describe('Taking screenshots with simple hook', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com')
  })
  test('Full page screenshot', async ({ page }) => {
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
  })

  test('Single element screenshot', async ({ page }) => {
    const element = await page.$('h1')
    if (element != null) {
      await element.screenshot({ path: 'single_element_screenshot.png' })
    }
  })
})

test('Custom helpers', async ({ page }) => {
  await loadHomepage(page)
  //await page.pause()
  await assertTitle(page)
})

// java -jar jenkins.war --httpPort=8080 --enable-future-java - will run a Jenkins server on http port 8080