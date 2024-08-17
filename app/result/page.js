"use client";
import getStripe from "@/utils/get-strips";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;

      try {
        const res = await fetch(
          `/api/checkout?session_id=${session_id}`
        );
        const sessionData = await res.json();

        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError("An error occured");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container
        maxWidth="100vw"
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth="100vw"
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="100vw"
      sx={{
        textAlign: "center",
        mt: 4,
      }}
    >
      {session.payment_status === "paid" ? (
        <>
          <Typography variant="h4">Thank you for purchasing</Typography>
          <Box sx={{ mt: 22 }}>
            <Typography variant="h6">Session Id: {session_id}</Typography>
            <Typography variant="body1">
              We have received your payment. you will receive an email with the
              order details shortly
            </Typography>
            <a href="/">
              <Button sx={{mt:10}}>
                Back to Home
              </Button>
            </a>
          </Box>
        </>
      ) : (
        <>
          {" "}
          <Typography variant="h4">payment Failed</Typography>
          <Box sx={{ mt: 22}}>
            <Typography variant="body1">
              Your payment was not Sucessful. please Try again
            </Typography>
            <a href="/">
              <Button sx={{mt:10}}>
                Back to Home
              </Button>
            </a>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ResultPage;
