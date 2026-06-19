'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Home/Hero';
import { FeaturesList } from '@/components/Home/FeaturesList';
import { HowItWorksSection } from '@/components/Home/HowItWorksSection';
import { CompaniesSection } from '@/components/Home/CompaniesSection';
import { CTASection } from '@/components/Home/CTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-10">
        <Hero />
        <FeaturesList />
        <HowItWorksSection />
        <CompaniesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

