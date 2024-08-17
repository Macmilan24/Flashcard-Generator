"use client";

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  InputBase,
  IconButton,
  Container,
  Box,
  CircularProgress,
  Stack,
} from "@mui/material";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import Navbar from "@/components/navbar/Navbar";

export default function Flashcards() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [filterdflashcards, setFilterdFlashcards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        console.log("Fetched Flashcards:", collections); // Debugging log
        setFlashcards(collections);
        setFilterdFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
      setLoading(false); // Stop loading once flashcards are fetched
    }

    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  // Filtering the flashcards based on the search query
  const handleSearch = () => {
    const filteredFlashcards = flashcards.filter((flashcard) =>
      flashcard.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log("Filtered Flashcards:", filteredFlashcards); // Debugging log

    setFilterdFlashcards(filterdflashcards);
  };

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <Container maxWidth="lg" sx={{ px: 4, pt: 12, mt: 1 }}>
        {/* Search Bar */}
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <InputBase
            placeholder="Search flashcards…"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch();
            }}
            sx={{
              ml: 1,
              width: "auto",
              bgcolor: "background.paper",
              borderRadius: "4px",
              p: 1,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
              maxWidth: "300px",
            }}
            inputProps={{ "aria-label": "search flashcards" }}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
        {loading && (
          // Loading Animation
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress size={60} thickness={4.5} />
          </Box>
        )}
        {/* Flashcards Grid */}
        {filterdflashcards.length > 0 ? (
          <Grid container spacing={4}>
            {filterdflashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    bgcolor: "background.default",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    borderRadius: "10px",
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(flashcard)}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "text.primary",
                        }}
                      >
                        {flashcard}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          // No Flashcards Found
          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ minHeight: "50vh" }}
          >
            <SentimentDissatisfiedIcon
              sx={{ fontSize: 64, color: "text.secondary" }}
            />
            <Typography variant="h6" color="text.secondary">
              No flashcards found
            </Typography>
          </Stack>
        )}
      </Container>
    </>
  );
}
