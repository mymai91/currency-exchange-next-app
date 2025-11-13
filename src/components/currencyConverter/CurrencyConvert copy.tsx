'use client'

import { Spinner } from "../ui/Spinner"
import { useGetListCurrency } from "./hooks/useGetListCurrency"
import { ArrowRightLeft } from "lucide-react"
import { CurrencySelector } from './CurrencySelector'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const currencyConvertSchema = z.object({
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Amount must be a positive number'
    }),
  fromCurrency: z.string().min(1, 'From currency is required'),
  toCurrency: z.string().min(1, 'To currency is required')
})

type CurrencyConvertForm = z.infer<typeof currencyConvertSchema>

export function CurrencyConvert() {
  const { data, isLoading, error } = useGetListCurrency()
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<CurrencyConvertForm>({
    resolver: zodResolver(currencyConvertSchema),
    defaultValues: {
      amount: '1.00',
      fromCurrency: 'USD',
      toCurrency: 'AUD'
    }
  })

  const fromCurrency = watch('fromCurrency')
  const toCurrency = watch('toCurrency')

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
    setValue('fromCurrency', toCurrency)
    setValue('toCurrency', fromCurrency)
  }

  const onSubmit = (data: CurrencyConvertForm) => {
    console.log('Converting:', data)
    // Add your conversion logic here
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-8">
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
                      className="text-3xl md:text-4xl font-bold text-gray-800 w-full border-none outline-none focus:ring-0 px-0"
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
                  <CurrencySelector
                    currencies={data}
                    value={field.value}
                    onChange={field.onChange}
                    label="From"
                  />
                )}
              />
            </div>

            <div className="flex justify-center md:pb-3">
              <button
                type="button"
                onClick={handleSwap}
                className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all rotate-90 md:rotate-0"
                aria-label="Swap currencies"
              >
                <ArrowRightLeft className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1">
              <Controller
                name="toCurrency"
                control={control}
                render={({ field }) => (
                  <CurrencySelector
                    currencies={data}
                    value={field.value}
                    onChange={field.onChange}
                    label="To"
                  />
                )}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
          >
            Convert
          </button>
        </form>
      </div>
    </div>
  )
}