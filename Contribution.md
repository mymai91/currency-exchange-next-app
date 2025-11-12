For a currency exchange app with Next.js, I'd recommend:

1) Architecture

Next.js SSR/SSG for initial data and SEO
React Query for client-side interactions and real-time updates
Next.js API routes as your backend endpoints

This gives you:

Fast initial page loads (Next.js)
Great SEO (SSR)
Excellent user experience (React Query)
Real-time capabilities
Efficient caching strategies
The combination is more powerful than either alone!

currency-exchange-next-app/
├── src/
│   ├── app/                          # App Router
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── page.tsx                  # Home page (SSR/SSG)
│   │   ├── globals.css
│   │   │
│   │   ├── api/                      # Next.js API Routes (BFF Pattern)
│   │   │   ├── currencies/
│   │   │   │   └── route.ts          # GET /api/currencies
│   │   │   ├── rates/
│   │   │   │   └── route.ts          # GET /api/rates
│   │   │   └── convert/
│   │   │       └── route.ts          # GET /api/convert
│   │   │
│   │   ├── converter/                # Currency converter page
│   │   │   └── page.tsx              # SSR with initial data
│   │   │
│   │   └── rates/                    # Exchange rates page
│   │       ├── page.tsx              # SSG/ISR for SEO
│   │       └── [base]/
│   │           └── page.tsx          # Dynamic rates page
│   │
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Spinner.tsx
│   │   │
│   │   ├── currency/                 # Currency-specific components
│   │   │   ├── CurrencyConverter.tsx
│   │   │   ├── CurrencySelector.tsx
│   │   │   ├── CurrencyList.tsx
│   │   │   ├── ExchangeRateCard.tsx
│   │   │   └── RateChart.tsx
│   │   │
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   └── providers/                # Context providers
│   │       └── ReactQueryProvider.tsx
│   │
│   ├── lib/                          # Utility functions & configs
│   │   ├── api/                      # API client functions
│   │   │   ├── client.ts             # Base API client
│   │   │   ├── currencies.ts         # Currency API calls
│   │   │   ├── rates.ts              # Rate API calls
│   │   │   └── convert.ts            # Convert API calls
│   │   │
│   │   ├── hooks/                    # React Query hooks
│   │   │   ├── useCurrencies.ts
│   │   │   ├── useRates.ts
│   │   │   ├── useConvert.ts
│   │   │   └── useRealTimeRates.ts
│   │   │
│   │   ├── utils/                    # Helper functions
│   │   │   ├── format.ts             # Currency formatting
│   │   │   ├── validation.ts         # Input validation
│   │   │   └── calculations.ts       # Conversion calculations
│   │   │
│   │   └── constants/
│   │       ├── config.ts             # App configuration
│   │       └── currencies.ts         # Static currency data
│   │
│   └── types/                        # TypeScript types
│       ├── currency.ts
│       ├── rate.ts
│       └── api.ts
│
├── public/                           # Static assets
│   ├── flags/                        # Currency flag icons
│   └── icons/
│
├── .env.local                        # Environment variables
└── next.config.ts


### Why use named function

should use **export function Header()**

```
// ❌ Arrow Function - Anonymous trong stack trace
const Header = () => {
  throw new Error('Test error');
  return <div>Header</div>;
};

// Error stack trace:
// Error: Test error
//   at _default (Header.tsx:2)  ← "Anonymous" hoặc "_default"
//   ...

// ✅ Named Function - Rõ ràng trong stack trace
export function Header() {
  throw new Error('Test error');
  return <div>Header</div>;
}

// Error stack trace:
// Error: Test error
//   at Header (Header.tsx:2)  ← Tên component rõ ràng!
```

How to use

```
// ✅ BEST - Explicit children type
interface HeaderProps {
  title: string;
  children?: React.ReactNode; // Explicit children
}

export function Header({ title, children }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1>{title}</h1>
      {children}
    </header>
  );
}

// Usage:
<Header title="Currency Exchange">
  <nav>
    <a href="/convert">Convert</a>
    <a href="/history">History</a>
  </nav>
</Header>
```