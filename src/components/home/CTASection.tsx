import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function CTASection() {
    return (
        <section className="py-16 sm:py-24 bg-blue-600 dark:bg-blue-700">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Ready to get started?
                    </h2>
                    <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                        Start converting currencies and tracking exchange rates today. It&apos;s fast, accurate, and easy to use.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
                        <Link href="/currencies">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                                Get Started
                            </Button>
                        </Link>
                        <Link href="/rates">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                                View All Rates
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
