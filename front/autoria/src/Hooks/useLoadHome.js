import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadHome = () => {
  // cars
  const [carsCount, setCarsCount] = useState([]);
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
        const [cars, carsForYouResponse, carsTopResponse, newsResponse, marksResponse] =
          await Promise.all([
            axios.get(import.meta.env.VITE_REACT_API_URL + 'Cars', {
              params: { PageSize: 100 }
            }),
            axios.get(import.meta.env.VITE_REACT_API_URL + 'Cars/GetCarsForYou'),
            axios.get(import.meta.env.VITE_REACT_API_URL + 'Cars/GetTopCars', {
              params: { count: 10 }
            }),
            axios.get(import.meta.env.VITE_REACT_API_URL + 'News'),
            axios.get(import.meta.env.VITE_REACT_API_URL + 'Marks/GetMarks')
          ]);
        console.log(carsForYouResponse);

        setCarsCount(cars.data.length);
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

  return { carsCount, carsForYou, carsTop, news, marks, user, loading, error };
};

export default useLoadHome;
