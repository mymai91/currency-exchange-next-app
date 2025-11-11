'use client';

import { useGetRates } from "./hooks/useGetRates"

export function ExchangeRate() {
  const rates = useGetRates({
    base: 'USD',
    currencies: 'VND,NZD'
  });


  console.log('Rates data:', rates.data);
  return (


    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden" >
      <div className="grid grid-cols-3 gap-4 bg-gray-800 text-white p-4 font-semibold">
        <div>Currency</div>
        <div>Exchange Rate</div>
        <div>Last Updated</div>
      </div>
    </div>
  )
}