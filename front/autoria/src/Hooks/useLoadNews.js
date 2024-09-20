import { useState, useEffect } from 'react';
import axios from 'axios';

const useLoadNews = () => {
  //news
  const [news, setNews] = useState([]);
  // loading, error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const [newsResponse] = await Promise.all([
          axios.get(import.meta.env.VITE_REACT_API_URL + 'News')
        ]);
        
        setNews(newsResponse.data.value);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { news, loading, error };
};

export default useLoadNews;