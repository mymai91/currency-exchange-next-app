import { apiClient, API_ENDPOINTS } from './client';
import type { Currency, ConvertQuery, ConvertResponse } from '@/types';

export const currencyApi = {
    getCurrencies: async (): Promise<Currency[]> => {
        const { data } = await apiClient.get<Currency[]>(API_ENDPOINTS.CURRENCIES);
        return data;
    },

    convertCurrency: async (query: ConvertQuery): Promise<ConvertResponse> => {
        const { data } = await apiClient.get<ConvertResponse>(
            API_ENDPOINTS.CONVERT,
            {
                params: query,
            }
        );
        return data;
    },
};
