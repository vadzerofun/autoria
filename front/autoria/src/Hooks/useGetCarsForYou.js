import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetCarsForYou = () => {
  const [carsForYou, setCarsForYou] = useState([]);
  const [loadingForYou, setLoadingForYou] = useState(true);
  const [errorForYou, setErrorForYou] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      await axios.get(import.meta.env.VITE_REACT_API_URL + 'Cars/GetCarsForYou').then((response) => {
        setCarsForYou(response.data.value);
      }).catch((error) => {
        setErrorForYou(error);
      }).finally(() => {
        setLoadingForYou(false);
      });      
    };

    fetchCars();
  }, []);

  return { carsForYou, loadingForYou, errorForYou };
};

export default useGetCarsForYou;
