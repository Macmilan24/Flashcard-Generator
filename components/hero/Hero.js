"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "@/components/magicui/particles";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { BorderBeam } from "../magicui/border-beam";
import ShimmerButton from "../magicui/shimmer-button";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Hero() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className="relative mt-4 flex flex-col justify-center md:justify-start md:flex-row h-screen w-full items-center overflow-hidden rounded-lg border bg-background p-6 md:p-20 md:shadow-xl">
      <div className="flex flex-col justify-end w-full md:w-3/5 mb-9">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500">
          Flashcard SaaS
        </h1>

        <p className="text-lg md:text-2xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 max-w-2xl mx-auto">
          Your Ultimate AI-Powered Flashcard Generator. Create and Customize
          Flashcards with the Power of AI.
        </p>
      </div>
      <div className="w-full md:w-2/5 flex justify-center">
        <SignedOut>
          <Link href={"/sign-in"}>
            <ShimmerButton className="shadow-2xl z-10">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Get Started {">"}
              </span>
            </ShimmerButton>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href={"/pricingpage"}>
            <ShimmerButton className="shadow-2xl z-10">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Get Started {">"}
              </span>
            </ShimmerButton>
          </Link>
        </SignedIn>
      </div>
      <Particles
        className="absolute inset-0 z-0"
        quantity={600}
        ease={50}
        color={color}
        refresh
      />
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
