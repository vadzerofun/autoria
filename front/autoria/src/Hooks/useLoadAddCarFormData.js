import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadAddCarFormData = () => {
  // marks
  const [marks, setMarks] = useState([]);
  // loading, error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marksResponse] =
          await Promise.all([
            axios.get(import.meta.env.VITE_REACT_API_URL + 'Marks/GetMarks')
          ]);
        setMarks(marksResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { marks, loading, error };
};

export default useLoadAddCarFormData;
