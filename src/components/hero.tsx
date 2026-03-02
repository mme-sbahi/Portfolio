import React from "react";
import HeroContent from "./sub/heroContent";
import Header from "./header";
export default function Hero() {
  return (
    <div className="relative flex flex-col">
      <Header />
      <HeroContent />
    </div>
  );
}
