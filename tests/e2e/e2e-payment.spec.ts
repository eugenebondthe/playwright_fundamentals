import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe.parallel('New Payment', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let paymentPage: PaymentPage
  let navbar: Navbar

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    paymentPage = new PaymentPage(page)
    navbar = new Navbar(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await loginPage.loginFix()
  })

  test('Should send new payment', async ({ page }) => {
    await navbar.clickOnTab('Pay Bills')
    await paymentPage.createPayment(
      'apple',
      '6',
      '5000',
      '2021-11-09',
      'Some random message',
    )
    await paymentPage.assertSuccessMessage()
  })
})
