import { NextRequest, NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol?: string;
  numericCode?: string;
  decimalDigits?: number;
}

export interface CurrencyConvertResponse {
  fromCurrency: CurrencyInfo;
  toCurrency: CurrencyInfo;
  originalAmount: number;
  convertedAmount: number;
  exchangeRate: string;
  timestamp: string;
}

/**
 * GET /api/convert
 * Convert currency from one to another
 * Query params:
 * - from: Source currency code (required, 3 uppercase letters)
 * - to: Target currency code (required, 3 uppercase letters)
 * - amount: Amount to convert (required, positive number)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const amount = searchParams.get('amount');

    // Validate required parameters
    if (!from || !to || !amount) {
      return NextResponse.json(
        { 
          error: 'Missing required parameters', 
          details: 'from, to, and amount are required' 
        },
        { status: 400 }
      );
    }

    // Validate currency codes format
    const currencyCodeRegex = /^[A-Z]{3}$/;
    if (!currencyCodeRegex.test(from) || !currencyCodeRegex.test(to)) {
      return NextResponse.json(
        { 
          error: 'Invalid currency code', 
          details: 'Currency codes must be 3 uppercase letters' 
        },
        { status: 400 }
      );
    }

    // Validate amount
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return NextResponse.json(
        { 
          error: 'Invalid amount', 
          details: 'Amount must be a positive number' 
        },
        { status: 400 }
      );
    }

    // Build query string for backend
    const queryParams = new URLSearchParams({
      from,
      to,
      amount: amount,
    });

    const backendUrl = `${BACKEND_API_URL}/v1/currencies/convert?${queryParams.toString()}`;

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Revalidate every 5 minutes - conversion rates change frequently
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { 
          error: 'Failed to convert currency', 
          details: errorData.message || 'Backend error' 
        },
        { status: response.status }
      );
    }

    const data: CurrencyConvertResponse = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error converting currency:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
