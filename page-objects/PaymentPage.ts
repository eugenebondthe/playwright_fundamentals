import { expect, Locator, Page } from '@playwright/test'

export class PaymentPage {
  readonly page: Page
  readonly payeeSelectbox: Locator
  readonly payeeDetailBtn: Locator
  readonly payeeDetail: Locator
  readonly accountSelectbox: Locator
  readonly amountInput: Locator
  readonly dateInput: Locator
  readonly descriptionInput: Locator
  readonly submitPaymentBtn: Locator
  readonly message: Locator

  constructor(page: Page) {
    this.page = page
    this.payeeSelectbox = page.locator('#sp_payee')
    this.payeeDetailBtn = page.locator('#sp_get_payee_details')
    this.payeeDetail = page.locator('#sp_payee_details')
    this.accountSelectbox = page.locator('#sp_account')
    this.amountInput = page.locator('#sp_amount')
    this.dateInput = page.locator('#sp_date')
    this.descriptionInput = page.locator('#sp_description')
    this.submitPaymentBtn = page.locator('#pay_saved_payees')
    this.message = page.locator('#alert_content > span')
  }

  async createPayment(
    payeeOption: string,
    accOption: string,
    amount: string,
    date: string,
    description: string,
  ) {
    await this.payeeSelectbox.selectOption(payeeOption)
    await this.payeeDetailBtn.click()
    await expect(this.payeeDetail).toBeVisible()
    await this.accountSelectbox.selectOption(accOption)
    await this.amountInput.fill(amount)
    await this.dateInput.fill(date)
    await this.descriptionInput.fill(description)
    await this.submitPaymentBtn.click()
  }

  async assertSuccessMessage() {
    await expect(this.message).toBeVisible()
    await expect(this.message).toContainText(
      'The payment was successfully submitted',
    )
  }
}
