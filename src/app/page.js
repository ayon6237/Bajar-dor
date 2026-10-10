import ProductsPage from "@/components/AllProducts";
import Hero from "@/components/Hero";
import PriceSections from "@/components/IncreasePriceSection";
import Marquee from "@/components/Marquee";
import React from "react";

const page = () => {
  return (
    <div>
      <Marquee />
      <Hero />
      <PriceSections />
      <ProductsPage />
    </div>
  );
};

export default page;
