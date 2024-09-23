import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadHome = () => {
  // cars
  const [carsForYou, setCarsForYou] = useState([]);
  const [carsTop, setCarsTop] = useState([]);
  //news
  const [news, setNews] = useState([]);
  // marks
  const [marks, setMarks] = useState([]);
  // user
  const [user, setUser] = useState(null);
  // loading, error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsForYouResponse, carsTopResponse, newsResponse, marksResponse] =
          await Promise.all([
            axios.get(import.meta.env.VITE_REACT_API_URL + 'Cars/GetCarsForYou'),
            axios.post(import.meta.env.VITE_REACT_API_URL + 'Cars/GetTopCars'),
            axios.get(import.meta.env.VITE_REACT_API_URL + 'News'),
            axios.get(import.meta.env.VITE_REACT_API_URL + 'Marks/GetMarks')
          ]);
          console.log(carsForYouResponse);
          

        setCarsForYou(carsForYouResponse.data.value.filter(Boolean));
        setCarsTop(carsTopResponse.data.value.filter(Boolean));
        setNews(newsResponse.data.value);
        setMarks(marksResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { carsForYou, carsTop, news, marks, user, loading, error };
};

export default useLoadHome;
