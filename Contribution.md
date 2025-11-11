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
│   │   ├── api/                      # Next.js API Routes (BFF Pattern) ✅ IMPLEMENTED
│   │   │   ├── currencies/
│   │   │   │   └── route.ts          # GET /api/currencies ✅
│   │   │   ├── rates/
│   │   │   │   └── route.ts          # GET /api/rates ✅
│   │   │   └── convert/
│   │   │       └── route.ts          # GET /api/convert ✅
│   │   │
│   │   ├── converter/                # Currency converter page (TODO)
│   │   │   └── page.tsx              # SSR with initial data
│   │   │
│   │   └── rates/                    # Exchange rates page (TODO)
│   │       ├── page.tsx              # SSG/ISR for SEO
│   │       └── [base]/
│   │           └── page.tsx          # Dynamic rates page
│   │
│   ├── components/                   # Reusable components
│   │   ├── home/                     # ✅ IMPLEMENTED
│   │   │   └── ExchangeRate.tsx      # Exchange rate table with React Query
│   │   │
│   │   ├── ui/                       # UI primitives (TODO)
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Spinner.tsx
│   │   │
│   │   ├── currency/                 # Currency-specific components (TODO)
│   │   │   ├── CurrencyConverter.tsx
│   │   │   ├── CurrencySelector.tsx
│   │   │   ├── CurrencyList.tsx
│   │   │   ├── ExchangeRateCard.tsx
│   │   │   └── RateChart.tsx
│   │   │
│   │   ├── layout/                   # Layout components ✅
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   └── providers/                # Context providers ✅
│   │       └── ReactQueryProvider.tsx
│   │
│   ├── services/                     # API service layer ✅ IMPLEMENTED
│   │   ├── index.ts                  # Service exports
│   │   ├── currencyService.ts        # Currency API client ✅
│   │   └── rateService.ts            # Rate API client ✅
│   │
│   ├── hooks/                        # React Query hooks ✅ IMPLEMENTED
│   │   ├── index.ts                  # Hook exports
│   │   ├── useCurrencies.ts          # Fetch currencies ✅
│   │   ├── useExchangeRates.ts       # Fetch rates ✅
│   │   └── useConvertCurrency.ts     # Convert currency ✅
│   │
│   ├── lib/                          # Utility functions & configs ✅
│   │   ├── axios.ts                  # Axios client
│   │   ├── genericApi.ts             # Generic API wrapper
│   │   │
│   │   └── utils/                    # Helper functions (TODO)
│   │       ├── format.ts             # Currency formatting
│   │       ├── validation.ts         # Input validation
│   │       └── calculations.ts       # Conversion calculations
│   │
│   └── types/                        # TypeScript types ✅
│       └── rate.ts                   # Rate & Currency types
│
├── public/                           # Static assets
│   ├── flags/                        # Currency flag icons
│   └── icons/
│
├── .env.local                        # Environment variables
├── BFF_PATTERN.md                    # ✅ BFF documentation
├── QUICK_REFERENCE.md                # ✅ Quick reference guide
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

### BFF Pattern (Backend-For-Frontend)
🎯 BFF là gì?
BFF = Backend For Frontend
Là một API layer trung gian nằm giữa Frontend và Backend services, được thiết kế riêng để phục vụ nhu cầu của một frontend cụ thể.

❌ KHÔNG có BFF - Frontend gọi trực tiếp Backend

```
// ===== React Component (Frontend) =====
function CurrencyDashboard() {
  // Phải gọi NHIỀU APIs
  const user = await fetch('https://api.example.com/users/me');
  const rates = await fetch('https://api.example.com/rates');
  const history = await fetch('https://api.example.com/history?days=30');
  const preferences = await fetch('https://api.example.com/preferences');
  
  // Vấn đề:
  // ❌ 4 HTTP requests → slow
  // ❌ Frontend phải biết structure của tất cả APIs
  // ❌ Nếu Backend thay đổi → Frontend phải update nhiều nơi
  // ❌ Duplicate logic (auth, error handling) ở mọi component
  // ❌ Không thể aggregate/transform data
  // ❌ CORS issues
  // ❌ Expose backend URLs ra public
}
```

✅ CÓ BFF - Frontend chỉ gọi BFF

```
// ===== React Component (Frontend) =====
function CurrencyDashboard() {
  // Chỉ cần 1 API call!
  const dashboard = await fetch('/api/dashboard');
  
  // BFF đã aggregate tất cả data cần thiết
  const { user, rates, history, preferences } = dashboard;
  
  // Lợi ích:
  // ✅ 1 HTTP request → fast
  // ✅ Frontend chỉ biết BFF API
  // ✅ Backend thay đổi → chỉ update BFF
  // ✅ Logic tập trung ở BFF
  // ✅ BFF aggregate/transform data
  // ✅ No CORS (same domain)
  // ✅ Backend URLs ẩn đằng sau BFF
}

// ===== BFF Layer (Next.js API Route) =====
// app/api/dashboard/route.ts
export async function GET(request: Request) {
  // BFF gọi nhiều backend services
  const [user, rates, history, preferences] = await Promise.all([
    fetch('http://backend:3000/users/me'),
    fetch('http://backend:3000/rates'),
    fetch('http://backend:3000/history?days=30'),
    fetch('http://backend:3000/preferences'),
  ]);
  
  // Aggregate & transform data
  return Response.json({
    user: user.data,
    rates: rates.data.map(r => ({
      currency: r.currency_code,
      value: r.rate,
    })),
    history: history.data,
    preferences: preferences.data,
  });
}
```

---

## 🏗️ Kiến trúc BFF Pattern

### **Architecture 1: Single BFF**
```
┌──────────────────────────────────────┐
│          Web Browser                 │
└────────────┬─────────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│   Next.js (Frontend + BFF)         │
│                                    │
│   ┌─────────────┐  ┌────────────┐ │
│   │   Pages/    │  │   /api/*   │ │
│   │ Components  │  │  (BFF)     │ │
│   └─────────────┘  └─────┬──────┘ │
└───────────────────────────┼────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
        ┌─────────┐   ┌─────────┐   ┌─────────┐
        │ NestJS  │   │  Rails  │   │ Python  │
        │   API   │   │   API   │   │   API   │
        └─────────┘   └─────────┘   └─────────┘
```

### **Architecture 2: Multiple BFFs (Microservices)**
```
┌───────────┐  ┌───────────┐  ┌───────────┐
│  Web App  │  │Mobile App │  │  Desktop  │
└─────┬─────┘  └─────┬─────┘  └─────┬─────┘
      │              │              │
      ▼              ▼              ▼
┌─────────┐    ┌─────────┐    ┌─────────┐
│Web BFF  │    │Mobile   │    │Desktop  │
│(Next.js)│    │   BFF   │    │  BFF    │
└────┬────┘    └────┬────┘    └────┬────┘
     │              │              │
     └──────────────┼──────────────┘
                    │
         ┌──────────┴──────────┐
         ▼                     ▼
    ┌─────────┐           ┌─────────┐
    │Backend  │           │Backend  │
    │Service 1│           │Service 2│
    └─────────┘           └─────────┘

```