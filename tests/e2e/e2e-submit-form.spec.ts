import { test, expect } from '@playwright/test'

test.describe.parallel("Feedback Form", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#feedback")
    })

    // Reset feedback form
    test("Reset Feedback Form", async ({ page }) => {
        await page.fill("#name", "Valera")
        await page.fill("#email", "valera.pavlov@gmail.com")
        await page.fill("#subject", "Stop spamming me")
        await page.fill("#comment", "Please stop sending me emails regarding ur marketing programs!")
        await page.click("input[name='clear']")

        const nameInput = await page.locator("#name")
        const commentInput = await page.locator("#comment")
        await expect(nameInput).toBeEmpty()
        await expect(commentInput).toBeEmpty()
    })

    // Submit feedback form
})