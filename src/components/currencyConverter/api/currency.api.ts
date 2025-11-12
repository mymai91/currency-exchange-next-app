import { api } from "@/lib/genericApi"

export interface CurrencyItemResponse {
  "symbol": string,
  "name": string,
  "decimalDigits": number,
  "code": string
}



export const getSupportCurrencies = async (): Promise<CurrencyItemResponse[]> => {
  const resp = await api.get<CurrencyItemResponse[]>('/v1/currencies')

  return resp.data
}