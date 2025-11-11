# Quick Reference: BFF API Implementation

## ✅ Implementation Complete

### Created Files

#### API Routes (BFF Layer)
- ✅ `/src/app/api/currencies/route.ts` - GET currencies
- ✅ `/src/app/api/rates/route.ts` - GET exchange rates
- ✅ `/src/app/api/convert/route.ts` - GET currency conversion

#### Service Layer
- ✅ `/src/services/currencyService.ts` - Currency API client
- ✅ `/src/services/rateService.ts` - Rate API client (updated)
- ✅ `/src/services/index.ts` - Service exports

#### React Query Hooks
- ✅ `/src/hooks/useCurrencies.ts` - Fetch currencies
- ✅ `/src/hooks/useExchangeRates.ts` - Fetch rates (existing)
- ✅ `/src/hooks/useConvertCurrency.ts` - Convert currency
- ✅ `/src/hooks/index.ts` - Hook exports

#### Types
- ✅ `/src/types/rate.ts` - Updated with all response types

#### Documentation
- ✅ `/BFF_PATTERN.md` - Complete BFF pattern documentation

---

## Usage Examples

### 1. Use Currencies Hook

```tsx
'use client';
import { useCurrencies } from '@/hooks';

export function CurrencySelector() {
  const { data: currencies, isLoading } = useCurrencies();
  
  return (
    <select>
      {currencies?.map(c => (
        <option key={c.code} value={c.code}>
          {c.name} ({c.symbol})
        </option>
      ))}
    </select>
  );
}
```

### 2. Use Exchange Rates Hook

```tsx
'use client';
import { useExchangeRates } from '@/hooks';

export function RateTable() {
  const { data, isLoading } = useExchangeRates({ 
    base: 'USD',
    currencies: 'EUR,GBP,JPY'
  });
  
  return (
    <div>
      <h2>Base: {data?.baseCurrency?.code}</h2>
      {data?.rates.map(rate => (
        <div key={rate.id}>
          {rate.targetCurrency.code}: {rate.rate}
        </div>
      ))}
    </div>
  );
}
```

### 3. Use Convert Currency Hook

```tsx
'use client';
import { useConvertCurrency } from '@/hooks';
import { useState } from 'react';

export function Converter() {
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
        onChange={e => setAmount(Number(e.target.value))}
      />
      {data && (
        <p>
          {data.originalAmount} {data.fromCurrency.code} = 
          {data.convertedAmount.toFixed(2)} {data.toCurrency.code}
        </p>
      )}
    </div>
  );
}
```

---

## API Endpoints

| Frontend Endpoint | Backend Endpoint | Method | Cache |
|------------------|------------------|--------|-------|
| `/api/currencies` | `/v1/currencies` | GET | 1h |
| `/api/rates` | `/v1/rate` | GET | 5m |
| `/api/convert` | `/v1/currencies/convert` | GET | 5m |

---

## Environment Setup

Create `.env.local`:

```bash
# Frontend calls its own API routes
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api

# API routes call NestJS backend
BACKEND_API_URL=http://localhost:3000
```

---

## Testing

### 1. Test API Routes Directly

```bash
# Start NestJS backend (port 3000)
cd currency-exchange-api
npm run start:dev

# Start Next.js app (port 3001)
cd currency-exchange-next-app
npm run dev

# Test endpoints
curl http://localhost:3001/api/currencies
curl "http://localhost:3001/api/rates?base=USD&currencies=EUR,GBP"
curl "http://localhost:3001/api/convert?from=USD&to=EUR&amount=100"
```

### 2. Test in Browser

Visit:
- http://localhost:3001/ - Home page with ExchangeRate component
- Open DevTools Network tab to see requests to `/api/*`

---

## Benefits Achieved

✅ **Security**: Backend URL hidden from client
✅ **Caching**: Server-side caching with Next.js
✅ **Type Safety**: Full TypeScript support
✅ **React Query**: Automatic caching, refetching, loading states
✅ **Validation**: Server-side validation in API routes
✅ **Error Handling**: Consistent error responses
✅ **SEO Ready**: Can use SSR/SSG with these endpoints
✅ **Code Organization**: Clean separation of concerns

---

## Next Steps

1. **Create UI Components**:
   - Currency selector dropdown
   - Exchange rate table
   - Currency converter form

2. **Add Pages**:
   - `/app/converter/page.tsx` - Currency converter page
   - `/app/rates/page.tsx` - Exchange rates page
   - `/app/rates/[base]/page.tsx` - Dynamic rates by base currency

3. **Enhance Features**:
   - Add search/filter for currencies
   - Add historical rate charts
   - Add favorite currencies
   - Add rate alerts

4. **Production Ready**:
   - Add rate limiting
   - Add monitoring/logging
   - Add error tracking (Sentry)
   - Add analytics
   - Optimize caching strategy

---

## File Structure Summary

```
src/
├── app/
│   ├── api/                          ✅ BFF Routes
│   │   ├── currencies/route.ts
│   │   ├── rates/route.ts
│   │   └── convert/route.ts
│   └── page.tsx
│
├── components/
│   └── home/
│       └── ExchangeRate.tsx          ✅ Using useExchangeRates hook
│
├── hooks/                            ✅ React Query Hooks
│   ├── index.ts
│   ├── useCurrencies.ts
│   ├── useExchangeRates.ts
│   └── useConvertCurrency.ts
│
├── services/                         ✅ API Clients
│   ├── index.ts
│   ├── currencyService.ts
│   └── rateService.ts
│
├── types/                            ✅ TypeScript Types
│   └── rate.ts
│
└── lib/
    ├── axios.ts
    └── genericApi.ts
```
