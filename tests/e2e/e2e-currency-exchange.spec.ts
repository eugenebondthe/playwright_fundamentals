import { test, expect } from '@playwright/test'

test.describe.parallel('Currency Exchange Form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#signin_button")
        await page.fill("#user_login", "username")
        await page.fill("#user_password", "password")
        await page.click("text=Sign in")
        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
    })

    test('Should make currency exchange', async ({ page }) => {
        await page.click('#pay_bills_tab')
        await page.click('text=Purchase Foreign Currency')
        await page.selectOption('#pc_currency', 'EUR')

        const rate = await page.locator('#sp_sell_rate')
        await expect(rate).toContainText('1 euro (EUR)')

        await page.fill('#pc_amount', '1000')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')

        const convertedAmount = await page.locator('#pc_conversion_amount')
        await expect(convertedAmount).toContainText('1000.00 U.S. dollar (USD)')

        await page.click('#purchase_cash')

        const msg = await page.locator('#alert_content')
        await expect(msg).toBeVisible()
        await expect(msg).toContainText('Foreign currency cash was successfully purchased')
    })
})