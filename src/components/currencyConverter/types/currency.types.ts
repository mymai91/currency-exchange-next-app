import { CurrencyEntity, Entity } from "@/types"

export interface CurrencyItemResponse extends CurrencyEntity {
  decimalDigits: number
}

export interface CurrencyInfo extends CurrencyEntity, Entity { }

export interface CurrencyConvertParams {
  from: string
  to: string
  amount: string
}

export interface CurrencyConvertResponse {
  fromCurrency: CurrencyInfo
  toCurrency: CurrencyInfo
  originalAmount: number
  convertedAmount: number
  exchangeRate: string
  timestamp: Date
}
