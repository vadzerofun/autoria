import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadCabinet = (userId) => {
  const [cars, setCars] = useState([]);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch cars data
        const carResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Cars/GetCarsByUserId?UserId=${userId}`
        );
        const carData = carResponse.data.value;

        // Fetch favorite cars data
        const favoriteCarResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Cars/GetLikedCarsByUserId?UserId=${userId}`
        );
        const favoriteCarData = favoriteCarResponse.data.value;

        setCars(carData);
        setFavoriteCars(favoriteCarData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [userId]);

  return { cars, favoriteCars, notifications, loading, error };
};

export default useLoadCabinet;
