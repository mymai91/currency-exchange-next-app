export interface CurrencyInfo {
  code: string;
  name: string;
  symbol?: string;
  numericCode?: string;
  decimalDigits?: number;
}

export interface RateResponse {
  id: number;
  source: string;
  date: string;
  rate: string;
  targetCurrency: CurrencyInfo;
}

export interface BaseRateResponse {
  baseCurrency: CurrencyInfo | null;
  rates: RateResponse[];
}

export interface CurrencyResponse {
  symbol: string;
  name: string;
  decimalDigits: number;
  code: string;
}

export interface CurrencyConvertResponse {
  fromCurrency: CurrencyInfo;
  toCurrency: CurrencyInfo;
  originalAmount: number;
  convertedAmount: number;
  exchangeRate: string;
  timestamp: string;
}
