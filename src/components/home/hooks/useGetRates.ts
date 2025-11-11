import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getRates, GetRatesParams, RateResponse } from "../api/rate.api"

export const useGetRates = (params: GetRatesParams,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    refetchInterval?: number;
  }
): UseQueryResult<RateResponse, Error> => {
  return useQuery({
    queryKey: ['rates', params],
    queryFn: () => getRates(params),
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    refetchInterval: options?.refetchInterval ?? false,
    enabled: options?.enabled ?? true,
  })
}