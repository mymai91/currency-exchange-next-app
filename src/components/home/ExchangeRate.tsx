'use client';

import clsx from 'clsx';
import { useGetRates } from "./hooks/useGetRates"

export function ExchangeRate() {
  const { isLoading, isError, data, isRefetching } = useGetRates({
    base: 'USD',
    currencies: 'VND,NZD'
  },
    {
      refetchInterval: 60 * 1000 * 10, // Refetch every 10 minutes
    });

  if (isError) {
    return <div className="text-red-500">Error loading exchange rates.</div>;
  }

  if (isLoading) {
    return <div> Loading exchange rates</div>
  }

  const { baseCurrency, rates } = data!;

  return (

    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden" >
      <div className="grid grid-cols-3 gap-4 px-6 py-4 font-medium text-gray-600 text-sm bg-gray-50 border-b border-gray-200">
        <div>Currency</div>
        <div>Exchange Rate</div>
        <div className="text-right">{isRefetching ? 'Updating...' : ' '}</div>
      </div>
      <div aria-label="base-amount" className="grid grid-cols-3 gap-4 bg-[#1e2a5e] text-white px-6 py-5 font-semibold text-lg">
        <div>{baseCurrency?.code}</div>
        <div>1</div>
      </div>
      {
        rates.map((rateItem, index) => (
          <div
            aria-label="rates-amount"
            key={rateItem.id}
            className={clsx(
              "grid grid-cols-3 gap-4 px-6 py-5 text-gray-800 hover:bg-gray-50 transition-colors",
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            )}
          >
            <div className="font-medium">{rateItem.targetCurrency.code}</div>
            <div className="font-semibold">{rateItem.rate}</div>
          </div>
        ))
      }
    </div>
  )
}