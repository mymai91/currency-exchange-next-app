import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';

export interface CurrencyResponse {
  symbol: string;
  name: string;
  decimalDigits: number;
  code: string;
}

/**
 * GET /api/currencies
 * Fetch all available currencies from the backend
 */
export async function GET() {
  try {
    const response = await fetch(`${BACKEND_API_URL}/v1/currencies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Revalidate every 1 hour - currencies don't change often
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch currencies from backend' },
        { status: response.status }
      );
    }

    const data: CurrencyResponse[] = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
