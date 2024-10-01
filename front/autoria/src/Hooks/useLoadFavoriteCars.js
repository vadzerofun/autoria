import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadFavoriteCars = (userId) => {
  // const [topCars, setTopCars] = useState([]);
  // carsCount
  const [carsCount, setCarsCount] = useState([]);
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [marks, setMarks] = useState([]);
  // models
  const [models, setModels] = useState([]);
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
        const carsCountResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Marks/GetMarks`
        );
        const carsCountData = carsCountResponse.data;

        // Fetch favorite cars data
        const favoriteCarResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Cars/GetLikedCarsByUserId`,
          {
            params: { userId: userId, Page: page, PageSize: pageSize },
          }
        );
        const favoriteCarData = favoriteCarResponse.data.value;

        // Fetch marks data
        const marksResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Marks/GetMarks`
        );
        const marksData = marksResponse.data; 
        
        // Fetch models data
        const modelsResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Models`
        );
        const modelsData = modelsResponse.data;

        // setTopCars(topCarsData);
        setCarsCount(carsCountData.length);
        setFavoriteCars(favoriteCarData.filter(Boolean));
        setMarks(marksData);
        setModels(modelsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [userId]);

  return { carsCount, favoriteCars, marks, models, loading, error };
};

export default useLoadFavoriteCars;
