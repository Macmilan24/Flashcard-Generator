import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { plan } = await req.json();
  const { userId } = getAuth(req);

  const priceDetailsMap = {
    Pro: {
      unit_amount: 500, // $5 in cents
      currency: "usd",
      interval: "month",
    },
    Expert: {
      unit_amount: 1000, // $10 in cents
      currency: "usd",
      interval: "month",
    },
  };

  // Validate the selected plan
  const priceDetails = priceDetailsMap[plan.title];

  if (!priceDetails) {
    return NextResponse.json(
      { error: { message: "Invalid plan selected." } },
      { status: 400 }
    );
  }

  // Define Stripe checkout session parameters
  const params = {
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: priceDetails.currency,
          product_data: {
            name: `${plan.title} Plan`,
          },
          unit_amount: priceDetails.unit_amount,
          recurring: {
            interval: priceDetails.interval,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get(
      "origin"
    )}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get(
      "origin"
    )}/result?session_id={CHECKOUT_SESSION_ID}`,
  };

  try {
    // Create the Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create(params);

    // Store subscription data in Firebase after successful session creation
    await setDoc(
      doc(db, "users", userId),
      {
        subscription: {
          plan: plan.title,
          status: "active",
          subscribedAt: new Date().toISOString(),
        },
      },
      { merge: true }
    );

    // Return the checkout session
    return NextResponse.json(checkoutSession);
  } catch (err) {
    console.error("Error creating checkout session", err);
    return NextResponse.json(
      { error: { message: err.message } },
      { status: 500 }
    );
  }
}
