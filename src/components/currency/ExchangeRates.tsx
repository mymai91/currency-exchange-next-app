'use client';

import { useRatesWithBase } from '@/lib/hooks/useRates';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Spinner } from '../ui/Spinner';
import { formatNumber, formatDate } from '@/lib/utils/format';

export function ExchangeRates() {
    const { data, isLoading, error, isRefetching } = useRatesWithBase();

    if (isLoading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-16">
                    <Spinner className="h-8 w-8 text-blue-600" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="py-16">
                    <div className="text-center">
                        <p className="text-red-600 font-medium">Failed to load exchange rates</p>
                        <p className="text-gray-500 text-sm mt-2">Please try again later</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!data || !data.rates || data.rates.length === 0) {
        return (
            <Card>
                <CardContent className="py-16">
                    <p className="text-center text-gray-500">No exchange rates available</p>
                </CardContent>
            </Card>
        );
    }

    const baseCurrency = data.baseCurrency;
    const rates = data.rates;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>
                            {baseCurrency ? `${baseCurrency.code} Exchange Rates` : 'Exchange Rates'}
                        </CardTitle>
                        <CardDescription>
                            Real-time currency exchange rates
                            {isRefetching && (
                                <span className="ml-2 text-blue-600">• Updating...</span>
                            )}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {rates.map((rate) => (
                        <div
                            key={rate.id}
                            className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold">
                                            {rate.targetCurrency.symbol}
                                        </span>
                                        <span className="text-lg font-semibold text-gray-900">
                                            {rate.targetCurrency.code}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {rate.targetCurrency.name}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm text-gray-500">Rate:</span>
                                    <span className="text-lg font-bold text-blue-600">
                                        {formatNumber(parseFloat(rate.rate), 4)}
                                    </span>
                                </div>
                                {rate.date && (
                                    <p className="text-xs text-gray-400 mt-2">
                                        Updated: {formatDate(rate.date)}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
