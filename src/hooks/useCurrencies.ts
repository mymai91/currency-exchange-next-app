'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { currencyApi } from '@/services/currencyService';
import { CurrencyResponse } from '@/types/rate';

export const CURRENCY_QUERY_KEYS = {
  all: () => ['currencies'] as const,
};

/**
 * Custom hook to fetch all available currencies
 * @returns React Query result with currencies data
 */
export function useCurrencies(): UseQueryResult<CurrencyResponse[], Error> {
  return useQuery({
    queryKey: CURRENCY_QUERY_KEYS.all(),
    queryFn: () => currencyApi.getCurrencies(),
    staleTime: 60 * 60 * 1000, // 1 hour - currencies rarely change
    gcTime: 24 * 60 * 60 * 1000, // Keep in cache for 24 hours
  });
}
