import { expect, Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page
    readonly signInBtn: Locator
    readonly searchBox: Locator

    constructor(page: Page) {
        this.page = page
        this.signInBtn = page.locator('#signin_button')
        this.searchBox = page.locator('#searchTerm')
    }

    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/index.html')
    }

    async clickOnSignIn() {
        await this.signInBtn.click()
    }

    async searchFor(phrase: string) {
        await this.searchBox.fill(phrase)
        await this.page.keyboard.press('Enter')
    }
}