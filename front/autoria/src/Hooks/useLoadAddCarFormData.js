import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadAddCarFormData = () => {
  // marks
  const [marks, setMarks] = useState([]);
  // models
  const [models, setModels] = useState([]);
  // loading, error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marksResponse, modelsResponse] = await Promise.all([
          axios.get(import.meta.env.VITE_REACT_API_URL + 'Marks/GetMarks'),
          axios.get(import.meta.env.VITE_REACT_API_URL + 'Models')
        ]);
        setMarks(marksResponse.data);
        setModels(modelsResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { marks, models, loading, error };
};

export default useLoadAddCarFormData;
