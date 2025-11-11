import { ExchangeRate, HeroSection } from '@/components/home';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ExchangeRate />
      {/* <FeaturesSection />
      <CTASection /> */}
    </main>
  );
}
