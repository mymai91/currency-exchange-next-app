import { useQuery } from '@tanstack/react-query';
import { rateApi } from '../api/rates';
import type { RateQuery } from '@/types';

export const RATE_QUERY_KEYS = {
    all: ['rates'] as const,
    list: (query?: RateQuery) => [...RATE_QUERY_KEYS.all, 'list', query] as const,
    withBase: () => [...RATE_QUERY_KEYS.all, 'with-base'] as const,
};

export function useRates(query?: RateQuery) {
    return useQuery({
        queryKey: RATE_QUERY_KEYS.list(query),
        queryFn: () => rateApi.getRates(query),
        refetchInterval: 60000, // Refetch every 60 seconds for live rates
    });
}

export function useRatesWithBase() {
    return useQuery({
        queryKey: RATE_QUERY_KEYS.withBase(),
        queryFn: rateApi.getRatesWithBase,
        refetchInterval: 60000, // Refetch every 60 seconds for live rates
    });
}
