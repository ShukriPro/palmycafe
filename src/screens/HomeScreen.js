import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import CafeCard from "../components/CafeCard";
import { getData, saveData } from "../services/database";
import { db } from "../services/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import SearchBar from "../components/SearchBar";
const HomeScreen = () => {
  
  //states
  const [searchQuery, setSearchQuery] = useState("");
  const [cafes, setCafes] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = getData("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  //Function to upade the search query
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    setDisplayCount(10);
  };

  // Filter cafes based on the search query
  const filteredCafes = cafes.filter((cafe) => {
    return (
      cafe.name.toLowerCase().includes(searchQuery) ||
      cafe.rating.toString().includes(searchQuery) ||
      // Add other conditions if needed
      cafe.address.toLowerCase().includes(searchQuery)
    );
  });
  console.log(filteredCafes);
  // fetch data from firebase
  useEffect(() => {
    // Reference to the collection
    const cafesCollectionRef = collection(db, "Cafes");
    // Listen for real-time updates
    const unsubscribe = onSnapshot(
      cafesCollectionRef,
      (snapshot) => {
        const fetchedCafes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCafes(fetchedCafes);
      },
      (error) => {
        console.error("Failed to load cafe data:", error);
      }
    );

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleFavoriteClick = (cafe) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(
        (favorite) => favorite.id === cafe.id
      );
      const updatedFavorites = isFavorite
        ? prevFavorites.filter((favorite) => favorite.id !== cafe.id)
        : [...prevFavorites, cafe];

      // Perform the localStorage update after the state update for performance reasons
      // and to ensure we don't serialize the data if there's no change.
      saveData("favorites", JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };

  const loadMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ my: 4, width: "100%", maxWidth: "400px", mx: "auto" }}
    >
      <SearchBar onSearch={handleSearch} />
      {filteredCafes.slice(0, displayCount).map((cafe) => (
        <CafeCard
          key={cafe.id}
          cafe={cafe}
          favorites={favorites}
          handleFavoriteClick={handleFavoriteClick}
        />
      ))}
      {displayCount < filteredCafes.length && (
        <Button onClick={loadMore} sx={{ mt: 2 }}>
          Load More
        </Button>
      )}
    </Box>
  );

};

export default HomeScreen;
