import { test, expect } from '@playwright/test'


test.describe.parallel("Login / Logout Flow", () => {
    // Before Hook
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
    })

    // Negative Scenario
    test("Negative Scenario for Login", async ({ page }) => {
        await page.click("#signin_button")
        await page.fill("#user_login", "invalid username")
        await page.fill("#user_password", "invalid password")
        await page.click("text=Sign in")

        const errorMessage = await page.locator(".alert-error")
        await expect(errorMessage).toContainText("Login and/or password are wrong")
    })

    // Positive Scenario
    test("Positive Scenario fot Login + Logout", async ({ page }) => {
        await page.click("#signin_button")
        await page.fill("#user_login", "username")
        await page.fill("#user_password", "password")
        await page.click("text=Sign in")
        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")

        const accountSummaryTab = await page.locator("#account_summary_tab")
        await expect(accountSummaryTab).toBeVisible()

        await page.goto("http://zero.webappsecurity.com/logout.html")
        const signInBtn = await page.locator("#signin_button")
        await expect(signInBtn).toBeVisible()
    })
})