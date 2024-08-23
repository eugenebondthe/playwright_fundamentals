import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
  // Define selectors
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitBtn: Locator
  readonly errorMsg: Locator
  readonly loginForm: Locator

  // Init selectors using constructor
  constructor(page: Page) {
    super(page)
    this.usernameInput = page.locator('#user_login')
    this.passwordInput = page.locator('#user_password')
    this.submitBtn = page.locator('text=Sign in')
    this.errorMsg = page.locator('.alert-error')
    this.loginForm = page.locator('#login_form')
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

  async snapshotLoginForm() {
    // var-1
    // const loginFormScreenshot = await this.loginForm.screenshot()
    // await expect(loginFormScreenshot).toMatchSnapshot('login-form.png')
    
    // var-2
    expect(await this.loginForm.screenshot()).toMatchSnapshot('login-form.png')
  }

  async snapshotErrorMessage() {
    // var-1
    // const errorScreenshot = await this.errorMsg.screenshot()
    // await expect(errorScreenshot).toMatchSnapshot('login-error.png')
    
    // var-2
    expect(await this.errorMsg.screenshot()).toMatchSnapshot('login-error.png')
  }
}
