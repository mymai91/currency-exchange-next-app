import { api } from "@/lib/genericApi";
import { Entity } from "@/types";

export interface GetRatesParams {
  base: string;
  currencies: string;
}

export interface RateResponse {
  baseCurrency: BaseCurrency;
  rates: Rate[];
}

export interface BaseCurrency extends Entity {
  code: string;
  name: string;
  symbol: string;
}

export interface Rate extends Entity {
  date: Date;
  rate: string;
  source: string;
  targetCurrency: BaseCurrency;
}

export const getRates = async (params: GetRatesParams): Promise<RateResponse> => {
  const { base, currencies } = params;
  const resp = await api.get<RateResponse>('/v1/rate', { params: { base, currencies } });

  return resp.data;
}