import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useLoadCarPage = () => {
  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);
  // marks
  const [marks, setMarks] = useState([]);
  // models
  const [models, setModels] = useState([]);
  // similar cars
  const [similarCars, setSimilarCars] = useState([]);

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
        if (carData && carData.userId) {
          const userResponse = await axios.get(`${import.meta.env.VITE_REACT_API_URL}User/${carData.userId}`);
          setUser(userResponse.data);
        }

        // Fetch marks data
        const marksResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Marks/GetMarks`
        );
        const marksData = marksResponse.data;
        setMarks(marksData);

        // Fetch models data
        const modelsResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Models`
        );
        const modelsData = modelsResponse.data;
        setModels(modelsData);

        // Fetch similar cars
        const similarCarsResponse = await axios.get(
          `${import.meta.env.VITE_REACT_API_URL}Cars/GetMostProfitable`
        );
        const similarCarsData = similarCarsResponse.data.value;
        setSimilarCars(similarCarsData.filter(Boolean));
        
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

  return { car, user, marks, models, similarCars, loading, error };
};

export default useLoadCarPage;
