import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadSearchCars = () => {
  // cars
  const [cars, setCars] = useState([]);
  // marks
  const [marks, setMarks] = useState([]);
  
  // loading, error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsResponse, marksResponse] =
          await Promise.all([
            axios.get(import.meta.env.VITE_REACT_API_URL + 'Cars', {
              params: { PageSize: 100 }
            }),
            axios.get(import.meta.env.VITE_REACT_API_URL + 'Marks/GetMarks')
          ]);

        setCars(carsResponse.data.filter(Boolean));
        setMarks(marksResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cars, marks, loading, error };
};

export default useLoadSearchCars;
