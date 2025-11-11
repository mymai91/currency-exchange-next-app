export interface Currency {
    symbol: string;
    name: string;
    decimalDigits: number;
    code: string;
}

export interface CurrencyInfo {
    id: number;
    code: string;
    symbol: string;
    name: string;
}

export interface ConvertQuery {
    from: string;
    to: string;
    amount: number;
}

export interface ConvertResponse {
    from: CurrencyInfo;
    to: CurrencyInfo;
    amount: number;
    result: number;
    rate: number;
    date: Date;
}
