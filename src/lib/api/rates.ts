import { apiClient, API_ENDPOINTS } from './client';
import type { RateResponse, RateQuery } from '@/types';

export const rateApi = {
    getRates: async (query?: RateQuery): Promise<RateResponse> => {
        const { data } = await apiClient.get<RateResponse>(API_ENDPOINTS.RATES, {
            params: query,
        });
        return data;
    },

    getRatesWithBase: async (): Promise<RateResponse> => {
        const { data } = await apiClient.get<RateResponse>(
            API_ENDPOINTS.RATES_WITH_BASE
        );
        return data;
    },
};
