import { api } from "@/lib/genericApi"
import { CurrencyEntity, Entity } from "@/types"

export interface CurrencyItemResponse extends CurrencyEntity {
  "decimalDigits": number,
}

export interface CurrencyInfo extends Entity { }
export interface CurrencyConvertResponse {
  fromCurrency: CurrencyInfo,
  toCurrency: CurrencyInfo,
  originalAmount: number,
  convertedAmount: number,
  exchangeRate: string,
  timestamp: Date
}

export const getSupportCurrencies = async (): Promise<CurrencyItemResponse[]> => {
  const resp = await api.get<CurrencyItemResponse[]>('/v1/currencies')

  return resp.data
}

export interface CurrencyConvertParams {
  from: string,
  to: string,
  amount: string
}

export const getCurrencyConvert = async (params: CurrencyConvertParams): Promise<CurrencyConvertResponse> => {
  const resp = await api.get<CurrencyConvertResponse>('/v1/currencies/convert', { params })

  return resp.data
}