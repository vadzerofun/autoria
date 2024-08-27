import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadCabinet = (userId) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch car data
        const carResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Cars/GetCarsByUserId?UserId=${userId}`
        );
        const carData = carResponse.data.value;
        setCars(carData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [userId]);

  return { cars, loading, error };
};

export default useLoadCabinet;
