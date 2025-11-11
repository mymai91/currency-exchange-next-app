import { api } from '@/lib/genericApi';
import { BaseRateResponse } from '@/types/rate';

export const rateApi = {
  /**
   * Get exchange rates with optional base currency and target currencies
   * @param base - Base currency code (default: 'USD')
   * @param currencies - Comma-separated target currency codes
   */
  getRates: async (params?: { base?: string; currencies?: string }): Promise<BaseRateResponse> => {
    const response = await api.get<BaseRateResponse>('/api/rates', {
      params,
    });
    return response.data;
  },

  /**
   * Get exchange rates with base currency information
   */
  getRatesWithBase: async (): Promise<BaseRateResponse> => {
    const response = await api.get<BaseRateResponse>('/api/rates');
    return response.data;
  },
};
