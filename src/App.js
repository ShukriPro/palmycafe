// In App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNavBar from './components/BottomNavBar';
import HomeScreen from './screens/HomeScreen';
import FavoriteScreen from './screens/FavoriteScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/palmycafe" element={<HomeScreen />} />
        <Route path="/favorite" element={<FavoriteScreen />} />
        {/* Other routes... */}
      </Routes>
      <BottomNavBar />
    </Router>
  );
}

export default App;
