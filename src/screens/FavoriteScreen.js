import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  IconButton,
  CardActions,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating"; // Make sure to import Rating
import { getData, saveData } from "../services/database"; // Import saveData as well

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = getData("favorites");
    if (storedFavorites) {
      try {
        // Parse the stored string as JSON and set it to favorites
        const parsedFavorites = JSON.parse(storedFavorites);
        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites);
        } else {
          // If parsed data is not an array, set an empty array
          setFavorites([]);
        }
      } catch (error) {
        // If parsing fails, also set an empty array
        setFavorites([]);
      }
    } else {
      // If no data in storage, set an empty array
      setFavorites([]);
    }
  }, []);
  

  // Handle click to toggle favorite status
  const handleFavoriteClick = (cafe) => {
    setFavorites((prevFavorites) => {
      // Ensure prevFavorites is an array
      const validPrevFavorites = Array.isArray(prevFavorites) ? prevFavorites : [];
  
      const updatedFavorites = validPrevFavorites.some(favorite => favorite.name === cafe.name)
        ? validPrevFavorites.filter(favorite => favorite.name !== cafe.name)
        : [...validPrevFavorites, cafe];
  
      saveData("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };
  
  // The rest of the component (JSX)
  return (
    
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ my: 4 }}
    >
      <div>Favorites</div>
      {favorites.map((cafe, index) => (
        <Card key={index} sx={{ width: "100%", maxWidth: 345, mb: 2 }}>
          <Grid container>
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography gutterBottom component="div">
                  {cafe.name}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                    mr={1}
                    style={{ fontSize: "0.875rem" }}
                  >
                    {cafe.rating}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={cafe.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                    ml={1}
                    style={{ fontSize: "0.875rem" }}
                  >
                    ({cafe.reviewCount})
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Cafe - {cafe.address}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" style={{ fontSize: "0.875rem" }}>
                  Get Direction
                </Button>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleFavoriteClick(cafe)}
                  color={
                    favorites.some((favorite) => favorite.name === cafe.name)
                      ? "error"
                      : "default"
                  }
                >
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardMedia
                component="img"
                image={cafe.imageUrl}
                title={cafe.name}
                sx={{ width: "100%", height: "auto", maxWidth: "200px" }}
              />
            </Grid>
          </Grid>
        </Card>
      ))}
    </Box>
  );
};

export default FavoriteScreen;
