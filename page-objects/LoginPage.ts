import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
  // Define selectors
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitBtn: Locator
  readonly errorMsg: Locator

  // Init selectors using constructor
  constructor(page: Page) {
    super(page)
    this.usernameInput = page.locator('#user_login')
    this.passwordInput = page.locator('#user_password')
    this.submitBtn = page.locator('text=Sign in')
    this.errorMsg = page.locator('.alert-error')
  }

  //Define login page methods
  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitBtn.click()
  }

  async loginFix() {
    await this.page.goto(
      'http://zero.webappsecurity.com/bank/transfer-funds.html',
    )
  }

  async assertErrorMsg() {
    await expect(this.errorMsg).toContainText('Login and/or password are wrong')
  }
}
