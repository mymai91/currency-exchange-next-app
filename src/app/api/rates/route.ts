import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';

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

/**
 * GET /api/rates
 * Fetch exchange rates from the backend
 * Query params:
 * - base: Base currency code (optional, default: USD)
 * - currencies: Comma-separated target currency codes (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const base = searchParams.get('base');
    const currencies = searchParams.get('currencies');

    // Build query string for backend
    const queryParams = new URLSearchParams();
    if (base) queryParams.set('base', base);
    if (currencies) queryParams.set('currencies', currencies);

    const backendUrl = `${BACKEND_API_URL}/v1/rate${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Revalidate every 5 minutes - rates change frequently
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch rates from backend' },
        { status: response.status }
      );
    }

    const data: BaseRateResponse = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching rates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
