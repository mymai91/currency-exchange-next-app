'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { rateApi } from '@/services/rateService';
import { BaseRateResponse } from '@/types/rate';

interface UseExchangeRatesParams {
  base?: string;
  currencies?: string;
  enabled?: boolean; // Allow conditional fetching
}

export const QUERY_KEYS = {
  rates: (params?: { base?: string; currencies?: string }) => 
    ['rates', params] as const,
  ratesWithBase: () => ['rates', 'with-base'] as const,
};

/**
 * Custom hook to fetch exchange rates
 * @param params - Query parameters
 * @returns React Query result with rates data
 */
export function useExchangeRates(
  params?: UseExchangeRatesParams
): UseQueryResult<BaseRateResponse, Error> {
  const { base, currencies, enabled = true } = params || {};

  return useQuery({
    queryKey: QUERY_KEYS.rates({ base, currencies }),
    queryFn: () => rateApi.getRates({ base, currencies }),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes - exchange rates don't change that often
    refetchInterval: 5 * 60 * 1000, // Auto-refetch every 5 minutes
  });
}

/**
 * Custom hook to fetch exchange rates with base currency
 * @returns React Query result with rates data
 */
export function useExchangeRatesWithBase(): UseQueryResult<BaseRateResponse, Error> {
  return useQuery({
    queryKey: QUERY_KEYS.ratesWithBase(),
    queryFn: () => rateApi.getRatesWithBase(),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}
