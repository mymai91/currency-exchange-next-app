import { api } from '@/lib/genericApi';
import { CurrencyResponse, CurrencyConvertResponse } from '@/types/rate';

export const currencyApi = {
  /**
   * Get all available currencies
   */
  getCurrencies: async (): Promise<CurrencyResponse[]> => {
    const response = await api.get<CurrencyResponse[]>('/api/currencies');
    return response.data;
  },

  /**
   * Convert currency from one to another
   * @param from - Source currency code (3 uppercase letters)
   * @param to - Target currency code (3 uppercase letters)
   * @param amount - Amount to convert (positive number)
   */
  convertCurrency: async (params: {
    from: string;
    to: string;
    amount: number;
  }): Promise<CurrencyConvertResponse> => {
    const response = await api.get<CurrencyConvertResponse>('/api/convert', {
      params,
    });
    return response.data;
  },
};
