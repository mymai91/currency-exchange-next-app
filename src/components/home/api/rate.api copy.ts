import { api } from "@/lib/genericApi";

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol?: string;
  numericCode?: string;
  decimalDigits?: number;
}

export interface RateData {
  id: number;
  source: string;
  date: string;
  rate: string;
  targetCurrency: CurrencyInfo;
}

export interface RateResponse {
  baseCurrency: CurrencyInfo | null;
  rates: RateData[];
}

export interface GetRatesParams {
  base: string;
  currencies: string;
}

export const getRates = async (params: GetRatesParams): Promise<RateResponse> => {
  const response = await api.get<RateResponse>('/v1/rate', {
    params
  });
  return response.data;
};
