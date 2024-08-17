"use client";
import Navbar from "@/components/navbar/Navbar";
import { Container, Typography, Box, TextField, Button } from "@mui/material";

export default function Contact() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" className="pt-24">
        <Typography
          variant="h4"
          align="center"
          className="font-bold text-2xl md:text-4xl mb-8"
        >
          Get in <span className="text-blue-500">Touch</span>
        </Typography>
        <Box className="text-center p-6 rounded-lg bg-white shadow-lg">
          <Typography className="text-gray-700 mb-6">
            Have questions or need assistance? We are here to help! Reach out to
            us by filling out the form below, and our team will get back to you
            as soon as possible.
          </Typography>
          <form className="space-y-4">
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              className="mb-4"
            />
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              className="mb-4"
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              className="mb-4"
            />
            <Button
              variant="contained"
              color="primary"
              className="bg-blue-500 hover:bg-blue-600"
            >
              Send Message
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}
