import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useLoadCarPage = () => {
  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // carId
  const { carId } = useParams();
  // hasViewedCar
  const [hasViewedCar, setHasViewedCar] = useState(false);

  useEffect(() => {
    const fetchCarAndUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch car data
        const carResponse = await axios.get(`${import.meta.env.VITE_REACT_API_URL}Cars/${carId}`);
        const carData = carResponse.data;
        setCar(carData);        

        // Fetch user data using car's userId
        if (carData.userId) {
          const userResponse = await axios.get(`${import.meta.env.VITE_REACT_API_URL}User/${carData.userId}`);
          setUser(userResponse.data);
        }
        
        if (!hasViewedCar && carId) {
          await viewCar(carId);
        }

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarAndUser();
  }, [carId]);

  // viewCar
  const viewCar = async (carId) => {
    await axios
      .get(`${import.meta.env.VITE_REACT_API_URL}Cars/ViewCar`, {
        params: { CarId: carId }
      })
      .then(() => {
        setHasViewedCar(!hasViewedCar);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { car, user, loading, error };
};

export default useLoadCarPage;
