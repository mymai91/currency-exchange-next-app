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

    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden" >
      <div className="grid grid-cols-3 gap-4 p-4 font-semibold text-gray-700">
        <div>Currency</div>
        <div>Exchange Rate</div>
        <div>{isRefetching ? 'Updating...' : ' '}</div>
      </div>
      <div aria-label="base-amount" className="grid grid-cols-3 gap-4 bg-gray-800 text-white p-4 font-semibold">
        <div>{baseCurrency?.code}</div>
        <div>1</div>
      </div>
      {
        rates.map((rateItem, index) => (
          <div
            aria-label="rates-amount"
            key={rateItem.id}
            className={clsx(
              "grid grid-cols-3 gap-4 p-4 text-gray-700",
              index % 2 === 0 ? "bg-white" : "bg-gray-100"
            )}
          >
            <div>{rateItem.targetCurrency.code}</div>
            <div>{rateItem.rate}</div>
          </div>
        ))
      }
    </div>
  )
}