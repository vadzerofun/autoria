import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetCarById = (carId) => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch car data
        const carResponse = await axios.get(`${import.meta.env.VITE_REACT_API_URL}Cars/${carId}`);
        const carData = carResponse.data;
        setCar(carData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  return { car, loading, error };
};

export default useGetCarById;
