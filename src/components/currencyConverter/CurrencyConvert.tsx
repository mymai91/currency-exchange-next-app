'use client'

import { Spinner } from "../ui/Spinner"
import { useGetListCurrency } from "./hooks/useGetListCurrency"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from 'react-hook-form'
import { CurrencySelector } from "./CurrencySelector"
import { ArrowRightLeft } from "lucide-react"
import { useGetConvertCurrency } from "./hooks/useGetConvertCurrency"
import { useState } from "react"
import {
  currencyConvertSchema,
  CurrencyConvertForm,
  CurrencyConvertParams
} from "./types"

export function CurrencyConvert() {

  const { data, isLoading, error } = useGetListCurrency()

  const [convertParams, setConvertParams] = useState<CurrencyConvertParams | null>(null)

  const { data: convertResult, isLoading: isConverting, error: convertError } = useGetConvertCurrency(
    convertParams || { from: '', to: '', amount: '' }
  )

  const methods = useForm<CurrencyConvertForm>({
    resolver: zodResolver(currencyConvertSchema),
    defaultValues: {
      amount: '1.00',
      fromCurrency: 'USD',
      toCurrency: 'AUD'
    }
  })

  const { control, handleSubmit } = methods


  const onSubmit = (data: CurrencyConvertForm) => {
    const { fromCurrency, toCurrency, amount } = data
    setConvertParams({
      from: fromCurrency,
      to: toCurrency,
      amount: amount
    })
  }

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

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <form className="p-4 md:p-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div className="flex-shrink-0 md:w-64">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Amount
              </label>
              <Controller
                name="amount"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      className="text-3xl md:text-4xl font-bold text-gray-800 w-full focus:ring-0 border border-gray-200 p-4 rounded-xs"
                      placeholder="$1.00"
                    />
                    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
                  </div>
                )}
              />
            </div>

            <div className="flex-1">
              <Controller
                name="fromCurrency"
                control={control}
                render={({ field }) => (
                  <CurrencySelector label="From" currencies={data} value={field.value} onChange={field.onChange} />
                )}
              />
            </div>

            <div className="flex justify-center md:pb-3">
              <ArrowRightLeft className="w-5 h-5 text-gray-600" />
            </div>

            <div className="flex-1">
              <Controller
                name="toCurrency"
                control={control}
                render={({ field }) => (
                  <CurrencySelector label="To" currencies={data} value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isConverting}
          >
            {isConverting ? 'Converting...' : 'Convert'}
          </button>
        </form>

        {convertResult && (
          <div className="border-t border-gray-200 p-4 md:p-8 bg-gray-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {convertResult.originalAmount} {convertResult.fromCurrency.code}
                </p>
                <p className="text-3xl md:text-4xl font-bold text-gray-800">
                  {convertResult.convertedAmount.toFixed(2)} {convertResult.toCurrency.code}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Exchange Rate</p>
                <p className="text-lg font-semibold text-gray-800">
                  1 {convertResult.fromCurrency.code} = {convertResult.exchangeRate} {convertResult.toCurrency.code}
                </p>
              </div>
            </div>
          </div>
        )}


        {convertError && (
          <div className="border-t border-gray-200 p-4 md:p-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-semibold">Error converting currency</p>
              <p className="text-sm mt-1">{convertError.message}</p>
            </div>
          </div>
        )}
      </div>
    </div >
  )
}
