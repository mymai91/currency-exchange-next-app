# Backend-For-Frontend (BFF) Pattern Implementation

## Overview

This Next.js application implements the **Backend-For-Frontend (BFF)** pattern, where Next.js API routes act as an intermediary layer between the frontend and the NestJS backend API.

## Architecture

```
┌─────────────────┐
│  Browser/Client │
└────────┬────────┘
         │
         │ HTTP Requests
         ↓
┌─────────────────────────────────────┐
│  Next.js Frontend + API Routes      │
│  (Port 3001)                        │
│  ┌─────────────────────────────┐   │
│  │  /api/currencies            │   │
│  │  /api/rates                 │   │
│  │  /api/convert               │   │
│  └─────────────────────────────┘   │
└────────┬────────────────────────────┘
         │
         │ HTTP Requests
         ↓
┌─────────────────────────────────────┐
│  NestJS Backend API                 │
│  (Port 3000)                        │
│  ┌─────────────────────────────┐   │
│  │  /v1/currencies             │   │
│  │  /v1/rate                   │   │
│  │  /v1/currencies/convert     │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

## Benefits

✅ **Security**: Backend API URL and credentials are hidden from the client
✅ **Caching**: Next.js can cache responses at the edge/server level
✅ **Data Transformation**: Transform backend responses to match frontend needs
✅ **API Aggregation**: Combine multiple backend calls into one endpoint
✅ **Rate Limiting**: Implement rate limiting at the BFF layer
✅ **SEO**: Enable Server-Side Rendering with data from backend
✅ **Error Handling**: Centralized error handling and formatting

## API Routes

### 1. `/api/currencies`

Fetches all available currencies.

**Endpoint**: `GET /api/currencies`

**Backend**: `GET http://localhost:3000/v1/currencies`

**Response**:
```json
[
  {
    "code": "USD",
    "name": "US Dollar",
    "symbol": "$",
    "decimalDigits": 2
  }
]
```

**Caching**: 1 hour (currencies rarely change)

---

### 2. `/api/rates`

Fetches exchange rates with optional filters.

**Endpoint**: `GET /api/rates?base=USD&currencies=EUR,GBP`

**Backend**: `GET http://localhost:3000/v1/rate?base=USD&currencies=EUR,GBP`

**Query Parameters**:
- `base` (optional): Base currency code (default: USD)
- `currencies` (optional): Comma-separated target currency codes

**Response**:
```json
{
  "baseCurrency": {
    "code": "USD",
    "name": "US Dollar",
    "symbol": "$"
  },
  "rates": [
    {
      "id": 1,
      "source": "fixer",
      "date": "2025-11-11T00:00:00Z",
      "rate": "0.85",
      "targetCurrency": {
        "code": "EUR",
        "name": "Euro",
        "symbol": "€"
      }
    }
  ]
}
```

**Caching**: 5 minutes (rates change frequently)

---

### 3. `/api/convert`

Converts an amount from one currency to another.

**Endpoint**: `GET /api/convert?from=USD&to=EUR&amount=100`

**Backend**: `GET http://localhost:3000/v1/currencies/convert?from=USD&to=EUR&amount=100`

**Query Parameters**:
- `from` (required): Source currency code (3 uppercase letters)
- `to` (required): Target currency code (3 uppercase letters)
- `amount` (required): Amount to convert (positive number)

**Response**:
```json
{
  "fromCurrency": {
    "code": "USD",
    "name": "US Dollar",
    "symbol": "$"
  },
  "toCurrency": {
    "code": "EUR",
    "name": "Euro",
    "symbol": "€"
  },
  "originalAmount": 100,
  "convertedAmount": 85.5,
  "exchangeRate": "0.855",
  "timestamp": "2025-11-11T12:00:00Z"
}
```

**Validation**:
- Currency codes must be 3 uppercase letters
- Amount must be a positive number

**Caching**: 5 minutes

---

## Project Structure

```
src/
├── app/
│   └── api/                          # Next.js API Routes (BFF)
│       ├── currencies/
│       │   └── route.ts              # GET /api/currencies
│       ├── rates/
│       │   └── route.ts              # GET /api/rates
│       └── convert/
│           └── route.ts              # GET /api/convert
│
├── services/                         # API service layer
│   ├── currencyService.ts            # Currency API calls
│   └── rateService.ts                # Rate API calls
│
├── hooks/                            # React Query hooks
│   ├── useCurrencies.ts              # Fetch currencies
│   ├── useExchangeRates.ts           # Fetch rates
│   └── useConvertCurrency.ts         # Convert currency
│
├── types/
│   └── rate.ts                       # TypeScript types
│
└── lib/
    ├── axios.ts                      # Axios client
    └── genericApi.ts                 # Generic API wrapper
```

## Usage Examples

### 1. Fetch Currencies

```tsx
'use client';

import { useCurrencies } from '@/hooks/useCurrencies';

export function CurrencyList() {
  const { data, isLoading, error } = useCurrencies();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data?.map((currency) => (
        <li key={currency.code}>
          {currency.name} ({currency.code})
        </li>
      ))}
    </ul>
  );
}
```

### 2. Fetch Exchange Rates

```tsx
'use client';

import { useExchangeRates } from '@/hooks/useExchangeRates';

export function ExchangeRateTable() {
  const { data, isLoading } = useExchangeRates({ 
    base: 'USD', 
    currencies: 'EUR,GBP,JPY' 
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <table>
      {data?.rates.map((rate) => (
        <tr key={rate.id}>
          <td>{rate.targetCurrency.code}</td>
          <td>{rate.rate}</td>
        </tr>
      ))}
    </table>
  );
}
```

### 3. Convert Currency

```tsx
'use client';

import { useConvertCurrency } from '@/hooks/useConvertCurrency';
import { useState } from 'react';

export function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const { data, isLoading } = useConvertCurrency({ 
    from, 
    to, 
    amount,
    enabled: amount > 0 
  });

  return (
    <div>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(Number(e.target.value))} 
      />
      {/* Currency selectors */}
      
      {isLoading && <p>Converting...</p>}
      {data && (
        <p>
          {data.originalAmount} {data.fromCurrency.code} = 
          {data.convertedAmount} {data.toCurrency.code}
        </p>
      )}
    </div>
  );
}
```

## Environment Variables

Create a `.env.local` file:

```bash
# Frontend makes requests to its own /api routes
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

# Next.js API routes connect to NestJS backend
BACKEND_API_URL=http://localhost:3000
```

## Development Setup

1. **Start NestJS Backend** (Port 3000):
   ```bash
   cd currency-exchange-api
   npm run start:dev
   ```

2. **Start Next.js Frontend** (Port 3001):
   ```bash
   cd currency-exchange-next-app
   npm run dev
   ```

3. **Test API Routes**:
   ```bash
   # Currencies
   curl http://localhost:3001/api/currencies

   # Rates
   curl http://localhost:3001/api/rates?base=USD&currencies=EUR,GBP

   # Convert
   curl "http://localhost:3001/api/convert?from=USD&to=EUR&amount=100"
   ```

## Error Handling

All API routes implement consistent error handling:

```json
{
  "error": "Error message",
  "details": "Additional details if available"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad request (validation error)
- `404`: Not found
- `500`: Internal server error

## Caching Strategy

| Endpoint | Stale Time | Cache Control |
|----------|------------|---------------|
| `/api/currencies` | 1 hour | `s-maxage=3600` |
| `/api/rates` | 5 minutes | `s-maxage=300` |
| `/api/convert` | 5 minutes | `s-maxage=300` |

## Best Practices

✅ Always use the BFF routes (`/api/*`) from the frontend
✅ Never expose backend URLs to the client
✅ Implement proper validation in API routes
✅ Use React Query for client-side caching
✅ Handle errors gracefully with user-friendly messages
✅ Add rate limiting for production
✅ Monitor API route performance
✅ Use TypeScript for type safety across the stack
