import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe.parallel('Login / Logout Flow', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let navbar: Navbar

  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    navbar = new Navbar(page)

    await homePage.visit()
  })

  // Negative Scenario
  test('Negative Scenario for Login', async ({ page }) => {
    await homePage.clickOnSignIn()
    await loginPage.login('invalid username', 'invalid password')
    await loginPage.assertErrorMsg()
  })

  // Positive Scenario
  test('Positive Scenario fot Login + Logout', async ({ page }) => {
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await loginPage.loginFix()
    await expect(navbar.accountSummary).toBeVisible()

    await page.goto('http://zero.webappsecurity.com/logout.html')
    await expect(homePage.signInBtn).toBeVisible()
  })
})
