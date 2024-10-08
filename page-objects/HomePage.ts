import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class HomePage extends AbstractPage {
  readonly signInBtn: Locator
  readonly searchBox: Locator
  readonly linkFeedback: Locator
  readonly searchResults: Locator

  constructor(page: Page) {
    super(page)
    this.signInBtn = page.locator('#signin_button')
    this.searchBox = page.locator('#searchTerm')
    this.linkFeedback = page.locator('#feedback')
    this.searchResults = page.locator('li > a')
  }

  async visit() {
    await this.page.goto('http://zero.webappsecurity.com/index.html')
  }

  async clickOnSignIn() {
    await this.signInBtn.click()
  }

  async clickOnFeedbackLink() {
    await this.linkFeedback.click()
  }

  async searchFor(phrase: string) {
    await this.searchBox.fill(phrase)
    await this.page.keyboard.press('Enter')
  }

  async assertSearchResults(expLinkCount: number) {
    await expect(this.searchResults).toHaveCount(expLinkCount)
  }
}
