import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadCourse = () => {
  // course
  const [course, setCourse] = useState(40); 
  
  // loading, error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          courseResponse
        ] = await Promise.all([
          axios.get(
            'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json&valcode=USD'
          )
        ]);
        
        // console.log(courseResponse.data[0].rate);
        setCourse(courseResponse.data[0].rate);        
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { course, loading, error };
};

export default useLoadCourse;
