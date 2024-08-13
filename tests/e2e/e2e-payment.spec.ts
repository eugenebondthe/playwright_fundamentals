import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.parallel('New Payment', () => {
  let homePage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await loginPage.loginFix()
  })

  test('Should send new payment', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.selectOption('#sp_payee', 'apple')
    await page.click('#sp_get_payee_details')
    await page.waitForSelector('#sp_payee_details')
    await page.selectOption('#sp_account', '6')
    await page.fill('#sp_amount', '5000')
    await page.fill('#sp_date', '2021-11-09')
    await page.fill('#sp_description', 'Some random message')
    await page.click('#pay_saved_payees')

    const msg = await page.locator('#alert_content > span')
    await expect(msg).toBeVisible()
    await expect(msg).toContainText('The payment was successfully submitted')
  })
})
