import { expect, Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page
    readonly signInBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.signInBtn = page.locator('#signin_button')
    }

    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/index.html')
    }

    async clickOnSignIn() {
        await this.signInBtn.click()
    }
}