import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe.parallel('Feedback Form', () => {
  let homePage: HomePage
  let feedbackPage: FeedbackPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)

    await homePage.visit()
    await homePage.clickOnFeedbackLink()
  })

  // Reset feedback form
  test('Reset Feedback Form', async ({ page }) => {
    await feedbackPage.fillForm(
      'Valera',
      'valera.pavlov@gmail.com',
      'Stop spamming me',
      'Please stop sending me emails regarding ur marketing programs!',
    )
    await feedbackPage.resetForm()
    await feedbackPage.assertFeedbackFormReset()
  })

  // Submit feedback form
  test('Submit feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'Valera',
      'valera.pavlov@gmail.com',
      'Stop spamming me',
      'Please stop sending me emails regarding ur marketing programs!',
    )
    await feedbackPage.submitForm()
    await feedbackPage.assertFeedbackFormSent()
  })
})
