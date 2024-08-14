import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { PayBillsPage } from '../../page-objects/PayBillsPage'

test.describe.parallel('Currency Exchange Form', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let navbar: Navbar
  let payBillsPage: PayBillsPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    navbar = new Navbar(page)
    payBillsPage = new PayBillsPage(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await loginPage.loginFix()
  })

  test('Should make currency exchange', async ({ page }) => {
    await navbar.clickOnTab('Pay Bills')
    await payBillsPage.switchTab('Purchase Foreign Currency')
    await payBillsPage.purchaseForeignCurrency('EUR', '1000')
    await payBillsPage.assertSuccessfulTransaction()
  })
})
