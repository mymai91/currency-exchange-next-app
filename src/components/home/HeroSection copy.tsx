import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
                <div className="text-center">
                    {/* Hero Title */}
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
                        Live exchange rates
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl md:text-2xl max-w-3xl mx-auto">
                        Compare 100+ currencies in real time & find the right moment to transfer funds
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
                        <Link href="/currencies">
                            <Button size="lg" variant="primary">
                                View Currencies
                            </Button>
                        </Link>
                        <Link href="/rates">
                            <Button size="lg" variant="outline">
                                Check Rates
                            </Button>
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
                        <div className="text-center">
                            <div className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400 mb-4">
                                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Real-Time Rates
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Get up-to-date exchange rates from reliable sources
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400 mb-4">
                                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                100+ Currencies
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Support for major and exotic currencies worldwide
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400 mb-4">
                                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Fast & Accurate
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Lightning-fast conversions with precise calculations
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
