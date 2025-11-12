'use client'

import { useState } from 'react'
import { Spinner } from "../ui/Spinner"
import { useGetListCurrency } from "./hooks/useGetListCurrency"
import { ArrowRightLeft } from "lucide-react"
import { CurrencySelector } from './CurrencySelector'

export function CurrencyConvert() {
  const { data, isLoading, error } = useGetListCurrency()
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('AUD')
  const [amount, setAmount] = useState('1.00')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <p className="font-semibold">Error loading currencies</p>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-4 rounded-lg">
        No currencies available
      </div>
    )
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div className="flex-shrink-0 md:w-64">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Amount
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-3xl md:text-4xl font-bold text-gray-800 w-full border-none outline-none focus:ring-0 px-0"
                placeholder="$1.00"
              />
            </div>

            <div className="flex-1">
              <CurrencySelector
                currencies={data}
                value={fromCurrency}
                onChange={setFromCurrency}
                label="From"
              />
            </div>

            <div className="flex justify-center md:pb-3">
              <button
                onClick={handleSwap}
                className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all rotate-90 md:rotate-0"
                aria-label="Swap currencies"
              >
                <ArrowRightLeft className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1">
              <CurrencySelector
                currencies={data}
                value={toCurrency}
                onChange={setToCurrency}
                label="To"
              />
            </div>
          </div>

          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg">
            Convert
          </button>
        </div>
      </div>
    </div>
  )
}