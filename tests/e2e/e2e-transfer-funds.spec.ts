import { test, expect } from '@playwright/test'

test.describe.parallel("Transfer Funds and Make Payments", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#signin_button")
        await page.fill("#user_login", "username")
        await page.fill("#user_password", "password")
        await page.click("text=Sign in")
        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
    })

    test("Transfer Funds", async ({ page }) => {
        await page.click("#transfer_funds_tab")
        await page.selectOption("#tf_fromAccountId", "2")
        await page.selectOption("#tf_toAccountId", "3")
        await page.fill("#tf_amount", "500")
        await page.fill("#tf_description", "Because I want that")
        await page.click("#btn_submit")

        const boardHeader = await page.locator("h2.board-header")
        await expect(boardHeader).toContainText("Verify")
        await page.click("#btn_submit")

        const message = await page.locator(".alert-success")
        await expect(message).toContainText("You successfully submitted your transaction")
    })
})