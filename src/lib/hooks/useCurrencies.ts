import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { currencyApi } from '../api/currencies';
import type { ConvertQuery } from '@/types';

export const CURRENCY_QUERY_KEYS = {
    all: ['currencies'] as const,
    list: () => [...CURRENCY_QUERY_KEYS.all, 'list'] as const,
    convert: (query: ConvertQuery) =>
        [...CURRENCY_QUERY_KEYS.all, 'convert', query] as const,
};

export function useCurrencies() {
    return useQuery({
        queryKey: CURRENCY_QUERY_KEYS.list(),
        queryFn: currencyApi.getCurrencies,
    });
}

export function useConvertCurrency() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: currencyApi.convertCurrency,
        onSuccess: () => {
            // Optionally invalidate queries if needed
            queryClient.invalidateQueries({ queryKey: CURRENCY_QUERY_KEYS.all });
        },
    });
}
