import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { TransferFundsPage } from '../../page-objects/TransferFundsPage'

test.describe.parallel('Transfer Funds and Make Payments', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let navbar: Navbar
  let transferFundsPage: TransferFundsPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    navbar = new Navbar(page)
    transferFundsPage = new TransferFundsPage(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await loginPage.loginFix()
  })

  test('Transfer Funds', async ({ page }) => {
    await navbar.clickOnTab('Transfer Funds')
    await transferFundsPage.createTransfer(
      '2',
      '3',
      '500',
      'Because I want that',
    )
    await transferFundsPage.assertSuccessMsg()
  })
})
