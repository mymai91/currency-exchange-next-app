import { CurrencyInfo } from './currency';

export interface Rate {
    id: number;
    source: string;
    date: Date;
    rate: string;
    targetCurrency: CurrencyInfo;
}

export interface RateResponse {
    baseCurrency: CurrencyInfo | null;
    rates: Rate[];
}

export interface RateQuery {
    base?: string;
    target?: string;
}
