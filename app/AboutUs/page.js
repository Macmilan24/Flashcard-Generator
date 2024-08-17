"use client";
import Navbar from "@/components/navbar/Navbar";
import { Container, Typography, Box } from "@mui/material";

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" className="pt-24">
        <Typography
          variant="h4"
          align="center"
          className="font-bold text-2xl md:text-4xl mb-8"
        >
          About <span className="text-blue-500">Us</span>
        </Typography>
        <Box className="text-center p-6 rounded-lg bg-white shadow-lg">
          <Typography className="text-gray-700 mb-6">
            Welcome to Flashcard SaaS! Our mission is to provide the ultimate
            AI-powered flashcard generator that helps you create and customize
            flashcards effortlessly. With cutting-edge technology and a
            user-centric design, we aim to revolutionize the way you study and
            retain information.
          </Typography>
          <Typography className="text-gray-700 mb-6">
            Founded by a team of passionate developers, Flashcard SaaS is
            committed to making learning more effective and engaging. We
            continuously strive to improve our platform and provide top-notch
            features that cater to your needs.
          </Typography>
          <Typography className="text-gray-700 mb-6">
            Join us on this exciting journey and discover the future of learning
            with Flashcard SaaS!
          </Typography>
        </Box>
      </Container>
    </>
  );
}
