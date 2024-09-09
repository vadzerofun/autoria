import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadSubscriptions = (userId) => {
  const [cars, setCars] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch cars data
        const carResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Cars/GetCarsByUserId?UserId=${userId}`
        );
        const carData = carResponse.data.value;

        // Fetch subscriptions data
        const subscriptionsResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Subscribe`
        );
        const subscriptionsData = subscriptionsResponse.data.value;

        setCars(carData);
        setSubscriptions(subscriptionsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { cars, subscriptions, loading, error };
};

export default useLoadSubscriptions;
