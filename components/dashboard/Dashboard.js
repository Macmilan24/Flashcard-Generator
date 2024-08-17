"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles from "@/components/magicui/particles";
import { BorderBeam } from "@/components/magicui/border-beam";
import { cn } from "@/lib/utils";
import Navbar from "../navbar/Navbar";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Dashboard({ subscription }) {
  const { user } = useUser();
  const [userType, setUserType] = useState("");
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
    setUserType(subscription.plan);
  }, [theme, user, subscription.plan]);

  return (
    <>
      <Navbar />
      <div className="relative mt-4 flex flex-col justify-center items-center h-screen w-full overflow-hidden rounded-lg border bg-background p-6 shadow-xl">
        <div className="w-full flex flex-col items-center mb-9">
          <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500">
            {userType === "Pro"
              ? "Pro Plan User"
              : subscription === "Expert"
              ? "Expert Plan User"
              : "Basic Plan User"}{" "}
            {console.log(subscription)}
          </h1>
          <motion.a
            className="bg-black text-white rounded-full px-4 sm:px-5 py-2  z-10 font-semibold relative overflow-hidden group"
            whileHover={{ backgroundColor: "#fff", color: "#000" }}
            href="/generate"
          >
            Go to Generate ✨
            <motion.span
              className="absolute inset-0 w-full h-full border-2 border-transparent rounded-full group-hover:border-black"
              initial={{ scaleX: 0, scaleY: 0 }}
              animate={{ scaleX: 1, scaleY: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.a>
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
    </>
  );
}
