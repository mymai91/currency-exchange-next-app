const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
    CURRENCIES: `${API_BASE_URL}/v1/currencies`,
    RATES: `${API_BASE_URL}/v1/rate`,
    RATES_WITH_BASE: `${API_BASE_URL}/v1/rate/with-base`,
    CONVERT: `${API_BASE_URL}/v1/currencies/convert`,
} as const;
