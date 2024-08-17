"use client";

import Navbar from "@/components/navbar/Navbar";
import Pricing from "@/components/pricing/Pricing";

export default function PrcingPage() {
  return (
    <div className="mt-2">
      <Navbar />
      <div
        className="w-full h-screen mt-2
      p-12 justify-center items-center"
      >
        <Pricing />
      </div>
    </div>
  );
}
