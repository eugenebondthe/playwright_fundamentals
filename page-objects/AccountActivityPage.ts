import { expect, Locator, Page } from '@playwright/test'

export class AccountActivityPage {
  readonly page: Page
  readonly accSelector: Locator
  readonly accTransactionTable: Locator
  readonly noResults: Locator

  constructor(page: Page) {
    this.page = page
    this.accSelector = page.locator('#aa_accountId')
    this.accTransactionTable = page.locator(
      '#all_transactions_for_account tbody tr',
    )
    this.noResults = page.locator('.well')
  }

  async selectAccount(accName: string) {
    switch (accName) {
      case 'Savings':
        await this.accSelector.selectOption('1')
        break
      case 'Checking':
        await this.accSelector.selectOption('2')
        break
      case 'Savings':
        await this.accSelector.selectOption('3')
        break
      case 'Loan':
        await this.accSelector.selectOption('4')
        break
      case 'Credit Card':
        await this.accSelector.selectOption('5')
        break
      case 'Brokerage':
        await this.accSelector.selectOption('6')
        break
      default:
        throw new Error('There is no such option...')
    }
  }

  async assertAccTransactions(rowsNum: number) {
    await expect(this.accTransactionTable).toHaveCount(rowsNum)
  }

  async assertEmptyTransactionTable() {
    await expect(this.noResults).toBeVisible()
  }
}
