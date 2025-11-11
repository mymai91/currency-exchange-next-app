'use client';

import { useExchangeRatesWithBase } from '@/hooks/useExchangeRates';

export function ExchangeRate() {
  const { data, isLoading, error } = useExchangeRatesWithBase();

  if (isLoading) {
    return (
      <div className="container py-8">
        <p className="text-center">Loading exchange rates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <p className="text-center text-red-500">Error loading rates: {error.message}</p>
      </div>
    );
  }

  if (!data?.rates || data.rates.length === 0) {
    return (
      <div className="container py-8">
        <p className="text-center">No data available</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Currency</th>
              <th className="text-left p-4">Rate</th>
              <th className="text-left p-4">Source</th>
              <th className="text-left p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.rates.map((rate) => (
              <tr key={rate.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div>
                    <p className="font-semibold">{rate.targetCurrency.code}</p>
                    <p className="text-sm text-gray-600">{rate.targetCurrency.name}</p>
                  </div>
                </td>
                <td className="p-4">{parseFloat(rate.rate).toFixed(4)}</td>
                <td className="p-4 capitalize">{rate.source}</td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(rate.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.baseCurrency && (
        <p className="text-sm text-gray-600 mt-4">
          Base Currency: {data.baseCurrency.code} - {data.baseCurrency.name}
        </p>
      )}
    </div>
  );
}