import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class PayBillsPage extends AbstractPage {
  readonly paySavedPayee: Locator
  readonly addNewPayee: Locator
  readonly purchaseForeignCur: Locator
  readonly curSelector: Locator
  readonly sellRate: Locator
  readonly amountInput: Locator
  readonly inDollarsRadioBtn: Locator
  readonly calculateCostsBtn: Locator
  readonly convertedAmount: Locator
  readonly purchaseBtn: Locator
  readonly successPurchaseMsg: Locator

  constructor(page: Page) {
    super(page)
    this.paySavedPayee = page.locator('text=Pay Saved Payee')
    this.addNewPayee = page.locator('text=Add New Payee')
    this.purchaseForeignCur = page.locator('text=Purchase Foreign Currency')
    this.curSelector = page.locator('#pc_currency')
    this.sellRate = page.locator('#sp_sell_rate')
    this.amountInput = page.locator('#pc_amount')
    this.inDollarsRadioBtn = page.locator('#pc_inDollars_true')
    this.calculateCostsBtn = page.locator('#pc_calculate_costs')
    this.convertedAmount = page.locator('#pc_conversion_amount')
    this.purchaseBtn = page.locator('#purchase_cash')
    this.successPurchaseMsg = page.locator('#alert_content')
  }

  async switchTab(tabName: string) {
    switch (tabName) {
      case 'Pay Saved Payee':
        await this.paySavedPayee.click()
        break
      case 'Add New Payee':
        await this.addNewPayee.click()
        break
      case 'Purchase Foreign Currency':
        await this.purchaseForeignCur.click()
        break
      default:
        throw new Error('This tab does not exist...')
    }
  }

  async purchaseForeignCurrency(curName: string, amount: string) {
    await this.curSelector.selectOption(curName)
    await expect(this.sellRate).toContainText('U.S. dollar (USD)')
    await this.amountInput.fill(amount)
    await this.inDollarsRadioBtn.click()
    await this.calculateCostsBtn.click()
    await expect(this.convertedAmount).toContainText(
      `${amount}.00 U.S. dollar (USD)`,
    )
    await this.purchaseBtn.click()
  }

  async assertSuccessfulTransaction() {
    await expect(this.successPurchaseMsg).toBeVisible()
    await expect(this.successPurchaseMsg).toContainText(
      'Foreign currency cash was successfully purchased',
    )
  }
}
