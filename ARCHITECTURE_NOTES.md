# Architecture Notes: State Management Best Practices

## Table of Contents
- [React Query vs Context vs LocalStorage](#react-query-vs-context-vs-localstorage)
- [Currency Data Management](#currency-data-management)
- [Authentication Pattern](#authentication-pattern)
- [Decision Framework](#decision-framework)

---

## React Query vs Context vs LocalStorage

### When to Use React Query (TanStack Query)

**Use for:** Server/API data that needs to be fetched and cached

✅ **Perfect for:**
- Currency list from API
- Exchange rates
- Conversion results
- Historical rate data
- User profile data (after login)
- Any data fetched from backend

**Benefits:**
- Automatic caching with configurable stale time
- Built-in loading/error states
- Request deduplication
- Background refetching
- Optimistic updates
- DevTools for debugging
- Memory + optional persistent cache

**Example:**
```typescript
const { data: currencies, isLoading } = useCurrencies();
// All components using this hook share the same cached data
// First call fetches, subsequent calls read from cache
```

---

### When to Use Context

**Use for:** Client-side UI state and user preferences

✅ **Perfect for:**
- User preferences (selected currency pair, favorites)
- UI state (theme, language)
- Form state across components
- Authentication state (token, isAuthenticated)
- Session data

❌ **Don't use for:**
- API data (use React Query instead)
- Data that can be derived from URL
- Static reference data from backend

**Example:**
```typescript
// CurrencyPreferencesContext
{
  fromCurrency: 'USD',
  toCurrency: 'EUR',
  favoritesCurrencies: ['USD', 'EUR', 'GBP'],
  recentPairs: [...],
  setFromCurrency: (code) => {},
  swapCurrencies: () => {}
}
```

---

### When to Use LocalStorage

**Use for:** Persistent client-side data

✅ **Perfect for:**
- Auth tokens (if not using httpOnly cookies)
- User preferences that persist across sessions
- Draft/unsaved form data
- Theme preference

❌ **Don't use directly for:**
- API data (use React Query with persistence plugin if needed)
- Complex state management

**Note:** React Query can use LocalStorage via persistence plugin for offline-first apps

---

## Currency Data Management

### Architecture for Currency Exchange App

```
┌─────────────────────────────────────┐
│   React Query (Server State)       │
│   - Currency list                   │
│   - Exchange rates                  │
│   - Conversion results              │
│   - Historical data                 │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Components (Any Page)             │
│   - Just call useCurrencies()       │
│   - Data shared automatically       │
└─────────────────────────────────────┘
              ↑
┌─────────────────────────────────────┐
│   Context (Client/UI State)         │
│   - Selected currency pair          │
│   - Favorite currencies             │
│   - User preferences                │
└─────────────────────────────────────┘
```

### Multiple Pages Using Currency List

**Pattern:** Call `useCurrencies()` in every component that needs it

```typescript
// Page A - Currency Converter
const { data: currencies } = useCurrencies();

// Page B - Currency List
const { data: currencies } = useCurrencies();

// Component C - Currency Selector
const { data: currencies } = useCurrencies();
```

**Why this works:**
- React Query cache is global
- First call fetches from API
- All subsequent calls read from cache (no network request)
- No prop drilling needed
- No Context provider needed

### Currency List Configuration

```typescript
export const useCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const { data } = await api.get<Currency[]>('/currencies');
      return data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days in cache
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
```

**Rationale:**
- Currencies don't change frequently → high staleTime (24h)
- Keep in cache for a week → gcTime (7 days)
- No need to refetch on focus/mount → static data

---

## Authentication Pattern

### Use BOTH Context and React Query

```
Context = Store token & auth state
React Query = Fetch user data & API calls
```

### AuthContext (Context API)

**What goes in Context:**
```typescript
{
  token: string | null,
  isAuthenticated: boolean,
  login: (token: string) => void,
  logout: () => void
}
```

**Responsibilities:**
- Store JWT/access token
- Manage authentication state
- Persist to localStorage/cookies
- Provide to axios interceptors
- Clear React Query cache on logout

**Why Context:**
- Needs to be synchronously available
- Used in axios interceptors immediately
- Not "server data" - it's session state
- Doesn't benefit from caching/refetching

### React Query for User Data

**What goes in React Query:**
```typescript
useUser()                  // Fetch /api/me
useUserSettings()          // User preferences from API
useConversionHistory()     // User's past conversions
```

**Why React Query:**
- Fetched from API after login
- Has loading/error states
- Can be refetched/invalidated
- Benefits from caching
- Stale-while-revalidate pattern

### Auth Flow Architecture

```
┌──────────────────────────────────────────┐
│  AuthContext (Client State)             │
│  - token: string | null                  │
│  - isAuthenticated: boolean              │
│  - login(token)                          │
│  - logout()                              │
└──────────────────────────────────────────┘
         ↓ (provides token to)
┌──────────────────────────────────────────┐
│  Axios Interceptor                       │
│  - Reads token from context              │
│  - Adds Authorization header             │
└──────────────────────────────────────────┘
         ↓ (makes authenticated requests)
┌──────────────────────────────────────────┐
│  React Query (Server State)              │
│  - useUser() → enabled when authenticated│
│  - All protected API calls               │
└──────────────────────────────────────────┘
```

### Login Flow

1. User submits credentials
2. API returns **token** → Store in Context + localStorage
3. Context sets `isAuthenticated = true`
4. React Query automatically fetches `useUser()` (enabled by auth state)
5. App shows user profile from React Query

### Logout Flow

1. Context clears token from state + localStorage
2. Context sets `isAuthenticated = false`
3. Context calls `queryClient.clear()` → Clears all React Query cache
4. Redirect to login page

---

## Decision Framework

### Quick Reference Table

| Data Type | Use | Reason |
|-----------|-----|--------|
| **API/Server Data** | React Query | Fetched, cached, refetched |
| **Currency list** | React Query | API data, rarely changes |
| **Exchange rates** | React Query | API data, needs updates |
| **User profile** | React Query | API data, cacheable |
| **Auth token** | Context | Sync state, interceptors |
| **isAuthenticated** | Context | Guard routes immediately |
| **User preferences** | Context | Client state, UI related |
| **Selected currencies** | Context | User choice, not API data |
| **Theme/Language** | Context | UI state |
| **Favorite currencies** | Context | User preference |
| **Draft form data** | LocalStorage | Persist across sessions |

### Decision Tree

```
Is this data from an API?
│
├─ YES → Use React Query
│   │
│   └─ Does it change rarely? (like currencies)
│       ├─ YES → Set high staleTime (24h)
│       └─ NO → Set appropriate staleTime
│
└─ NO → Is it user preference/session state?
    │
    ├─ YES → Use Context
    │
    └─ NO → Is it persistent client data?
        │
        ├─ YES → Use LocalStorage
        └─ NO → Use component state (useState)
```

### The Golden Rule

**"Can this be derived from the URL or regenerated from the server?"**
- **YES** → React Query (server state)
- **NO** → Context (client/UI state)

**For Currency Exchange App:**
- Context = "What did the user SELECT/PREFER?"
- React Query = "What does the API PROVIDE?"

---

## Form Validation Pattern

### react-hook-form + zod + React Query

**Recommended stack for currency converter:**

```typescript
// Schema validation with Zod
const converterSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  fromCurrency: z.string().min(3, 'Select a currency'),
  toCurrency: z.string().min(3, 'Select a currency'),
});

// Form with react-hook-form
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(converterSchema),
  defaultValues: {
    amount: 1,
    fromCurrency: 'USD',
    toCurrency: 'EUR',
  },
});

// Data from React Query
const { data: currencies } = useCurrencies();

// Submit handling
const onSubmit = async (data: ConverterForm) => {
  // Call conversion API
};
```

**Benefits:**
- Type-safe with TypeScript
- Automatic validation
- Clean error handling
- Server data via React Query
- User input via react-hook-form

---

## Summary

### State Management Strategy

1. **React Query** for all server/API data
2. **Context** for user preferences and auth state
3. **LocalStorage** for persistence (or via React Query plugin)
4. **Component state** for local UI interactions

### Mental Model

```
React Query Cache = Global State Manager for Server Data
Context = Global State Manager for Client/UI State
LocalStorage = Persistent Storage Layer
```

### For Currency Exchange App

- ✅ Fetch currency list with React Query (once, cache forever)
- ✅ Use in any component with `useCurrencies()` hook
- ✅ Store user's selected pair in Context
- ✅ Store auth token in Context
- ✅ Fetch user profile with React Query (after login)
- ✅ Validate forms with react-hook-form + zod

---

**Last Updated:** November 12, 2025
