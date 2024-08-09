import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadHome = () => {
  // cars
  const [carsForYou, setCarsForYou] = useState([]);
  const [carsMostProfitable, setCarsMostProfitable] = useState([]);
  //news
  const [news, setNews] = useState([]);
  const [user, setUser] = useState(null);
  // loading, error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const [carsForYouResponse, carsMostProfitableResponse, newsResponse] = await Promise.all([
          axios.get(import.meta.env.VITE_REACT_API_URL + 'Cars/GetCarsForYou'),
          axios.get(import.meta.env.VITE_REACT_API_URL + 'Cars/GetMostProfitable'),
          axios.get(import.meta.env.VITE_REACT_API_URL + 'News')
        ]);

        setCarsForYou(carsForYouResponse.data.value);
        setCarsMostProfitable(carsMostProfitableResponse.data.value);
        setNews(newsResponse.data.value);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { carsForYou, carsMostProfitable, news, user, loading, error };
};

export default useLoadHome;