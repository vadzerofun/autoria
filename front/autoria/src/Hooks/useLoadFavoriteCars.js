import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadFavoriteCars = (userId) => {
  // const [topCars, setTopCars] = useState([]);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const topCarsCount = 3;
  const page = 1;
  const pageSize = 7;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch favorite cars data
        const favoriteCarResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Cars/GetLikedCarsByUserId`,
          {
            params: { userId: userId, Page: page, PageSize: pageSize },
          }
        );
        const favoriteCarData = favoriteCarResponse.data.value;

        // Fetch favorite cars data
        const marksResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Marks/GetMarks`
        );
        const marksData = marksResponse.data;        

        // setTopCars(topCarsData);
        setFavoriteCars(favoriteCarData);
        setMarks(marksData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [userId]);

  return { favoriteCars, marks, loading, error };
};

export default useLoadFavoriteCars;
