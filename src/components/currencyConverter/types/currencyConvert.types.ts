import { z } from 'zod'

export const currencyConvertSchema = z.object({
  amount: z.string().min(1, 'Amount is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a positive number'
  }),
  fromCurrency: z.string().min(1, 'From currency is required'),
  toCurrency: z.string().min(1, 'To currency is required')
})

export type CurrencyConvertForm = z.infer<typeof currencyConvertSchema>
