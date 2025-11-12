import { HeroSection, ExchangeRate } from '@/components/home';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getRates } from '@/components/home/api/rate.api';

export default async function Home() {
  const queryClient = new QueryClient();

  // Prefetch the exchange rates on the server
  await queryClient.prefetchQuery({
    queryKey: ['rates', { base: 'USD', currencies: 'VND,NZD' }],
    queryFn: () => getRates({ base: 'USD', currencies: 'VND,NZD' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-screen bg-gray-50">
        <HeroSection />
        <ExchangeRate />
        {/* <FeaturesSection />
        <CTASection /> */}
      </main>
    </HydrationBoundary>
  );
}
