
import Hero from '@/components/Hero';
import PriceSections from '@/components/IncreasePriceSection';
import Marquee from '@/components/Marquee';
import React from 'react';

const page = () => {
  return (
    <div>
      <Marquee />
      <Hero />
      <PriceSections />
    </div>
  );
};

export default page;