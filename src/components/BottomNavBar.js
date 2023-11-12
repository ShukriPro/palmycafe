// In components/BottomNavBar.js
import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

export default function BottomNavBar() {
  const [value, setValue] = useState('home'); // default value is 'home'
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Navigate based on newValue
    if (newValue === 'home') {
      navigate('/palmycafe'); // navigate to home screen
    } else if (newValue === 'favorites') {
      navigate('/favorite'); // navigate to favorite screen
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}>
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction 
          label="Home" 
          value="home" 
          icon={<HomeIcon />} 
          sx={{ color: value === 'home' ? 'red' : 'inherit' }} 
        />
        <BottomNavigationAction 
          label="Favorites" 
          value="favorites" 
          icon={<FavoriteIcon />} 
          sx={{ color: value === 'favorites' ? 'red' : 'inherit' }}
        />
      </BottomNavigation>
    </Box>
  );
}
