import { HeroSection } from '@/components/home';
import { ExchangeRate } from '@/components/home/ExchangeRate';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <ExchangeRate />
      {/* <FeaturesSection />
      <CTASection /> */}
    </main>
  );
}
