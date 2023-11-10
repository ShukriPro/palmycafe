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
    // Fetch the favorite cafes data from localStorage on component mount
    const storedFavorites = getData("favorites");
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  // Handle click to toggle favorite status
  const handleFavoriteClick = (cafe) => {
    const updatedFavorites = favorites.some(
      (favorite) => favorite.name === cafe.name
    )
      ? favorites.filter((favorite) => favorite.name !== cafe.name)
      : [...favorites, cafe];

    saveData("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };
  // The rest of the component (JSX)
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ my: 4 }}
    >
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
