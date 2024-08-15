"use client";
import getStripe from "@/utils/get-strips";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
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

export default function Home() {
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
  return (
    <>
      <Box className={styles.navbar}>
        <Typography variant="h5" sx={{ color: "#836eff" }}>
          Flashcard Saas
        </Typography>
        <SignedOut>
          <div className={styles.navLinks}>
            <motion.a
              href="/sign-in"
              className={styles.navLinks}
              whileHover={{ color: "#836eff" }}
            >
              Login
            </motion.a>
            <motion.a
              href="/sign-up"
              className={styles.navLinks}
              whileHover={{ color: "#836eff" }}
            >
              Sign Up
            </motion.a>
          </div>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </Box>

      <Container maxWidth="lg">
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Typography variant="h1" className={styles.title}>
            Flashcard SaaS
          </Typography>
          <Typography
            variant="h5"
            className={styles.subtitle}
            gutterBottom
            marginBottom={4}
          >
            The easiest way to create flashcards from your text
          </Typography>
          <SignedIn>
            <motion.a
              href="/generate"
              className={styles.cta}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </SignedIn>
          <SignedOut>
            <motion.a
              href="/sign-in"
              className={styles.cta}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </SignedOut>
        </motion.div>

        <Box className={styles.featureContainer}>
          <Box className={styles.feature}>
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography>
              Simply input the text and let our software handle the rest.
            </Typography>
          </Box>
          <Box className={styles.feature}>
            <Typography variant="h6">Advanced AI</Typography>
            <Typography>
              Generate flashcards with cutting-edge AI technology.
            </Typography>
          </Box>
          <Box className={styles.feature}>
            <Typography variant="h6">Customizable</Typography>
            <Typography>
              Fully customize your flashcards to suit your needs.
            </Typography>
          </Box>
        </Box>

        <Box className={styles.pricingContainer}>
          <motion.div
            className={styles.pricingBox}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Typography variant="h5">Basics</Typography>
            <Typography variant="h6">$5/month</Typography>
            <Typography>Basic features with limited access</Typography>
          </motion.div>
          <motion.div
            className={styles.pricingBox}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubmit()}
          >
            <Typography variant="h5">Pro</Typography>
            <Typography variant="h6">$10/month</Typography>
            <Typography>Unlimited flashcards with advanced features</Typography>
          </motion.div>
        </Box>
      </Container>
      <Analytics />
    </>
  );
}
