import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CurrencyConvertParams, CurrencyConvertResponse, getCurrencyConvert } from "../api/currency.api";

export const useGetConvertCurrency = (params: CurrencyConvertParams): UseQueryResult<CurrencyConvertResponse> => {
  return useQuery({
    queryKey: ['currency-convert', params],
    queryFn: () => getCurrencyConvert(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: false,
    enabled: Boolean(params.from && params.to && params.amount),
  })
}