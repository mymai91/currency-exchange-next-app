import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getSupportCurrencies } from "../api/currency.api";
import { CurrencyItemResponse } from "../types";

export const useGetListCurrency = (): UseQueryResult<CurrencyItemResponse[]> => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: () => getSupportCurrencies(),
    staleTime: 60 * 1000 * 60 * 24, // 24 hours
    refetchInterval: false,
    enabled: true,
  })

}