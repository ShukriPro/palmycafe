// In App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNavBar from './components/BottomNavBar';
import HomeScreen from './screens/HomeScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import { saveData, getData } from './services/localStorage';
import Home from './screens/Home';
import cafesData from './cafes.json';
function App() {
  // Initialize the app when it mounts
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = () => {
    // Check if the data already exists in localStorage to avoid overwriting
    const existingData = getData('cafesData');
    if (!existingData) {
      saveData('cafesData', cafesData);
    }
  };

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/favorites" element={<FavoriteScreen />} />
    //   </Routes>
    //   <BottomNavBar />
    // </Router>
    <HomeScreen/>
  );
}

export default App;
