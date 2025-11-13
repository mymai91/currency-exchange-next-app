import { api } from "@/lib/genericApi"
import {
  CurrencyItemResponse,
  CurrencyConvertParams,
  CurrencyConvertResponse
} from "../types"

export const getSupportCurrencies = async (): Promise<CurrencyItemResponse[]> => {
  const resp = await api.get<CurrencyItemResponse[]>('/v1/currencies')

  return resp.data
}


export const getCurrencyConvert = async (params: CurrencyConvertParams): Promise<CurrencyConvertResponse> => {
  const resp = await api.get<CurrencyConvertResponse>('/v1/currencies/convert', { params })

  return resp.data
}