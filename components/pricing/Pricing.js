import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function Pricing(amount) {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = async (amount) => {
    // step 1: load stripe
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const stripe = await loadStripe(STRIPE_PK);

    // step 2: define the data for monthly subscription
    const body = {
      interval: "month",
      amount: amount ,
      plan: "yearly",
      planDescription: `Subscribe for $ ${amount}.00 Monthly`,
    };

    // step 3: make a post fetch api call to /checkout-session handler
    const result = await fetch("/api/checkout", {
      method: "post",
      body: JSON.stringify(body, null),
      headers: {
        "content-type": "application/json",
      },
    });

    // step 4: get the data and redirect to checkout using the sessionId
    const data = await result.json();
    const sessionId = data.id;
    stripe?.redirectToCheckout({ sessionId });
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
        {/* Plan Card */}
        {[
          {
            title: "Basic",
            price: "$10 / user",
            amount: 10,
            features: [
              "Get started with messaging",
              "Flexible team meetings",
              "5 TB cloud storage",
            ],
          },
          {
            title: "Startup",
            price: "$24 / user",
            amount: 24,
            features: [
              "All features in Basic",
              "Flexible call scheduling",
              "15 TB cloud storage",
            ],
          },
          {
            title: "Enterprise",
            price: "$35 / user",
            amount: 35,
            features: [
              "All features in Startup",
              "Growth oriented",
              "Unlimited cloud storage",
            ],
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
              className={`space-y-2 mb-6 ${
                hovered === index ? "text-white" : "text-gray-600"
              }`}
            >
              {plan.features.map((feature, i) => (
                <li key={i}>✔️ {feature}</li>
              ))}
            </ul>
            <button
              onClick={() => handleClick(plan.amount)}
              className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors ${
                hovered === index ? "border border-white" : ""
              }`}
            >
              Choose Plan →
            </button>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
