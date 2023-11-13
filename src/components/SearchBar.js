import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ onSearch }) => {
  return (
    <TextField 
      label="Search" 
      variant="outlined" 
      onChange={(e) => onSearch(e.target.value)}
      fullWidth
      margin="normal"
    />
  );
};

export default SearchBar;
