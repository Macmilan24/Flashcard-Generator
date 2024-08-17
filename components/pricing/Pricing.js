import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import getStripe from "@/utils/get-strips";
import { useUser } from "@clerk/nextjs";

export default function Pricing() {
  const [hovered, setHovered] = useState(null);
  const router = useRouter();

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const { user } = useUser();

  const handleSubmit = async (selectedPlanId) => {
    try {
      const response = await fetch("/api/checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          plan: { title: selectedPlanId },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error("Stripe error:", error.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Container maxWidth="lg" className="my-16">
      <Typography
        variant="h4"
        align="center"
        className="font-bold text-2xl md:text-4xl mb-8"
      >
        Flexible <span className="text-blue-500">Plans</span>
      </Typography>
      <Typography align="center" className="text-gray-600 mb-8">
        Choose a plan that works best for you and your team.
      </Typography>
      <Box className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-4">
        {[
          {
            title: "Basic",
            price: "Free",
            features: [
              "Get started with Text",
              "Limited features",
              "Up to 5 Flashcards per day",
            ],
            priceId: null, // No Stripe payment for free plan
          },
          {
            title: "Pro",
            price: "$5 / user",
            features: [
              "All features",
              "Flexible usage",
              "25 Flashcards per day",
            ],
            priceId: "Pro", // Replace with your Stripe Price ID
          },
          {
            title: "Expert",
            price: "$10 / user",
            features: ["All features in Pro", "Full usage", "Unlimited cards"],
            priceId: "Expert", // Replace with your Stripe Price ID
          },
        ].map((plan, index) => (
          <Box
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={`text-center p-6 rounded-lg transition-transform transform mb-6 md:mb-0 ${
              hovered === index
                ? "scale-105 bg-black text-white shadow-xl border-2 border-blue-500"
                : "scale-100 bg-white border border-gray-300"
            }`}
          >
            <Typography variant="h6" className="font-semibold mb-2">
              {plan.title}
            </Typography>
            <Typography className="text-gray-500 mb-4">{plan.price}</Typography>
            <ul
              className={`space-y-2 text-left mb-6 ${
                hovered === index ? "text-white" : "text-gray-600"
              }`}
            >
              {plan.features.map((feature, i) => (
                <li key={i}>✔️ {feature}</li>
              ))}
            </ul>
            <button
              onClick={() => handleSubmit(plan.priceId)}
              className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors ${
                hovered === index ? "border border-white" : ""
              }`}
            >
              {plan.priceId ? "Choose Plan →" : "Get Started"}
            </button>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
