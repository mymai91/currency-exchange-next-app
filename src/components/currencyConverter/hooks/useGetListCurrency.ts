import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CurrencyItemResponse, getSupportCurrencies } from "../api/currency.api";

export const useGetListCurrency = (): UseQueryResult<CurrencyItemResponse[]> => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: () => getSupportCurrencies(),
    staleTime: 60 * 1000 * 60 * 24, // 24 hours
    refetchInterval: false,
    enabled: true,
  })

}