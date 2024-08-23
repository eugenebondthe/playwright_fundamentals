import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.only("Login page visual tests", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
    })

    test("Login form", async ({ page }) => {
        await loginPage.snapshotLoginForm()
    })

    test("Login error message", async ({ page }) => {
        await loginPage.login("Fail", "123456")
        await loginPage.snapshotErrorMessage()
    })
})