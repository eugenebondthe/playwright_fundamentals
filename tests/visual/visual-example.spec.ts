import { test, expect } from "playwright/test"

test.describe("Visual regression testing example", () => {
    test('Full page snapshot', async ({ page }) => {
        await page.goto('https://www.exapmle.com')
        expect(await page.screenshot()).toMatchSnapshot("homepage.png")
    })

    test("Single element screenshot", async ({ page }) => {
        await page.goto('https://www.example.com')
        const pageElement = await page.waitForSelector('h1')
        expect(await pageElement.screenshot()).toMatchSnapshot("page-title.png")
    })
})

// to update the snapshots use flag:
// --update-snapshots
// for ex:
// --config=visual.config.ts --project=chromium --update-snapshots
// or delete the directory and rerun tests to create a new snapshots
// as well for visual testing we can use Percy pckg to have more options (not free) docs.percy.io/docs/playwright