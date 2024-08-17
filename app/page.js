"use client";
import getStripe from "@/utils/get-strips";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import styles from "./Home.module.css";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import Pricing from "@/components/pricing/Pricing";
import { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function Home() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.id);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setSubscription(docSnap.data().subscription);
        }
      }
    };

    fetchSubscription();
  }, [user]);

  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.log(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };
  if (subscription) {
    return <Dashboard subscription={subscription} />;
  }
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
