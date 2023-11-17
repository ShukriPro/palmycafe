import React, { useEffect, useState } from 'react';
import { getData, saveData } from "../services/localStorage";
import CafeCard from "../components/CafeCard";
import cafesData from '../cafes.json';

const Home = () => {
    const [cafeData, setCafeData] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Retrieve cafe data from localStorage using the key
        const savedCafeData = getData('cafesData');
        setCafeData(savedCafeData);

        // Retrieve favorites data from localStorage (if available)
        const savedFavorites = getData('favoritesData');
        if (savedFavorites) {
            setFavorites(savedFavorites);
        }
    }, []);

    const handleFavoriteClick = (cafe) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some((favorite) => favorite.id === cafe.id);
            const updatedFavorites = isFavorite
                ? prevFavorites.filter((favorite) => favorite.id !== cafe.id)
                : [...prevFavorites, cafe];

            // Save the updated favorites data to localStorage
            saveData('favoritesData', updatedFavorites);

            return updatedFavorites;
        });
    };

    return (
        <div>
          <h1>Home Page</h1>
          {cafeData ? (
            cafeData.map((cafe) => (
              <CafeCard
                key={cafe.id}
                cafe={cafe}
                isFavorite={favorites.some((favorite) => favorite.id === cafe.id)}
                handleFavoriteClick={handleFavoriteClick}
              />
            ))
          ) : (
            <p>No cafe data found in localStorage.</p>
          )}
        </div>
    );
}

export default Home;
