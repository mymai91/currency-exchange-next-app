'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { currencyApi } from '@/services/currencyService';
import { CurrencyConvertResponse } from '@/types/rate';

interface UseConvertCurrencyParams {
  from: string;
  to: string;
  amount: number;
  enabled?: boolean; // Allow conditional fetching
}

export const CONVERT_QUERY_KEYS = {
  convert: (params: { from: string; to: string; amount: number }) => 
    ['convert', params] as const,
};

/**
 * Custom hook to convert currency
 * @param params - Conversion parameters
 * @returns React Query result with conversion data
 */
export function useConvertCurrency(
  params: UseConvertCurrencyParams
): UseQueryResult<CurrencyConvertResponse, Error> {
  const { from, to, amount, enabled = true } = params;

  return useQuery({
    queryKey: CONVERT_QUERY_KEYS.convert({ from, to, amount }),
    queryFn: () => currencyApi.convertCurrency({ from, to, amount }),
    enabled: enabled && !!from && !!to && amount > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  });
}
