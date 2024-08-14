import { test, expect, selectors } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { AccountActivityPage } from '../../page-objects/AccountActivityPage'

test.describe.parallel('Filter Transactions', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let navbar: Navbar
  let accountActivityPage: AccountActivityPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    navbar = new Navbar(page)
    accountActivityPage = new AccountActivityPage(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await loginPage.loginFix()
  })

  test('Verify the results for each account', async ({ page }) => {
    await navbar.clickOnTab('Account Activity')
    await accountActivityPage.selectAccount('Checking')
    await accountActivityPage.assertAccTransactions(3)

    await accountActivityPage.selectAccount('Loan')
    await accountActivityPage.assertAccTransactions(2)

    await accountActivityPage.selectAccount('Brokerage')
    await accountActivityPage.assertEmptyTransactionTable()
  })
})
