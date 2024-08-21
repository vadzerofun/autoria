import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetCarById = (carId) => {
  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarAndUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch car data
        const carResponse = await axios.get(`${import.meta.env.VITE_REACT_API_URL}Cars/${carId}`);
        const carData = carResponse.data;
        setCar(carData);

        // View car
        if (carData) {
          await axios.get(`${import.meta.env.VITE_REACT_API_URL}Cars/ViewCar?CarId=${carId}`);
        }

        // Fetch user data using car's userId
        if (carData.userId) {
          const userResponse = await axios.get(`${import.meta.env.VITE_REACT_API_URL}User/${carData.userId}`);
          setUser(userResponse.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarAndUser();
  }, [carId]);

  return { car, user, loading, error };
};

export default useGetCarById;
