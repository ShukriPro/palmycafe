import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import CafeCard from "../components/CafeCard";
import { getData, saveData } from "../services/localStorage";
import { db } from "../services/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import SearchBar from "../components/SearchBar";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cafes, setCafes] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = getData("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // ... states ...

  useEffect(() => {
    const cafesCollectionRef = collection(db, "Cafes");
    const unsubscribe = onSnapshot(
      cafesCollectionRef,
      (snapshot) => {
        const fetchedCafes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Cafes:", fetchedCafes); // Diagnostic log
        setCafes(fetchedCafes);
      },
      (error) => {
        console.error("Failed to load cafe data:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  // ... other functions ...
  // ... other functions ...

  const filteredBeforeDedup = cafes.filter((cafe) => {
    return (
      cafe.name.toLowerCase().includes(searchQuery) ||
      cafe.rating.toString().includes(searchQuery) ||
      cafe.address.toLowerCase().includes(searchQuery)
    );
  });


  const deduplicateCafes = (cafes) => {
    const uniqueCafes = new Map();
    cafes.forEach(cafe => {
      // Create a unique key based on name and address
      const uniqueKey = `${cafe.name}-${cafe.address}`;
      if (!uniqueCafes.has(uniqueKey)) {
        uniqueCafes.set(uniqueKey, cafe);
      }
    });
    return Array.from(uniqueCafes.values());
  };
  
  const filteredCafes = deduplicateCafes(filteredBeforeDedup);






  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
    setDisplayCount(10);
  };

  const handleFavoriteClick = (cafe) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((favorite) => favorite.id === cafe.id);
      const updatedFavorites = isFavorite
        ? prevFavorites.filter((favorite) => favorite.id !== cafe.id)
        : [...prevFavorites, cafe];

      saveData("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const loadMore = () => {
    setDisplayCount((prevCount) => prevCount + 100);
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
