import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class TransferFundsPage extends AbstractPage {
  readonly fromAccountId: Locator
  readonly toAccountId: Locator
  readonly transferAmount: Locator
  readonly transferDescription: Locator
  readonly submitBtn: Locator
  readonly boardHeader: Locator
  readonly successMsg: Locator

  constructor(page: Page) {
    super(page)
    this.fromAccountId = page.locator('#tf_fromAccountId')
    this.toAccountId = page.locator('#tf_toAccountId')
    this.transferAmount = page.locator('#tf_amount')
    this.transferDescription = page.locator('#tf_description')
    this.submitBtn = page.locator('#btn_submit')
    this.boardHeader = page.locator('h2.board-header')
    this.successMsg = page.locator('.alert-success')
  }

  async createTransfer(
    fromAccId: string,
    toAccId: string,
    amount: string,
    description: string,
  ) {
    await this.fromAccountId.selectOption(fromAccId)
    await this.toAccountId.selectOption(toAccId)
    await this.transferAmount.fill(amount)
    await this.transferDescription.fill(description)
    await this.submitBtn.click()
    await expect(this.boardHeader).toContainText('Verify')
    await this.submitBtn.click()
  }

  async assertSuccessMsg() {
    await expect(this.successMsg).toContainText(
      'You successfully submitted your transaction',
    )
  }
}
