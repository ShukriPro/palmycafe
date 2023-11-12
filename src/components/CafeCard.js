import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  IconButton,
  Grid,
  Button,
  Box,
  Rating
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CafeCard = ({ cafe, favorites, handleFavoriteClick }) => {
  // Determine if the current cafe is favorited
  const isFavorite = Array.isArray(favorites) && favorites.some(fav => fav.id === cafe.id);

  return (
    <Card sx={{ width: '100%', maxWidth: 400, mb: 2 }}>
      <Grid container>
        <Grid
          item
          xs={8}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
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
                style={{ fontSize: '0.875rem' }}
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
                style={{ fontSize: '0.875rem' }}
              >
                ({cafe.reviewCount})
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">
              Cafe - {cafe.address}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" style={{ fontSize: '0.875rem' }}>
              Get Direction
            </Button>
            <IconButton
              aria-label="add to favorites"
              onClick={() => handleFavoriteClick(cafe)}
              color={isFavorite ? 'error' : 'default'}
            >
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardMedia
            component="img"
            image={cafe.imageUrl}
            title={cafe.name}
            sx={{ width: '100%', height: 'auto', maxWidth: '200px', margin:"10px", borderRadius: '8px'}}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default CafeCard;
