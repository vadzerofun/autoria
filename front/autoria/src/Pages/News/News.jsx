import React, { useState } from 'react';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import { Container } from 'react-bootstrap';
import './News.css';
import useLoadNews from '../../Hooks/useLoadNews';
import { NewsTextCardBig } from '../../Components/News/NewsTextCardBig/NewsTextCardBig';
import useToken from '../../Hooks/useToken';
import { getUserIdFromToken } from '../../Services/authService';
import { AuthOffcanvas } from '../../Components/Auth/AuthOffcanvas/AuthOffcanvas';
import ImagePlaceholder from '../../assets/placeholder-image.png';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { NewsTextCard } from '../../Components/News/NewsTextCard/NewsTextCard';

export const News = () => {
  // showOffcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const displayOffcanvas = () => {
    setShowOffcanvas(true);
  };

  // user, token
  const { token, setToken } = useToken();
  const [userId, setUserId] = useState(getUserIdFromToken(token));

  // images
  const imagesURL = import.meta.env.VITE_IMAGES_URL;

  // fetch Data
  const { news, loading, error } = useLoadNews();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(isToday(new Date(news[0].writingTime)));

  return (
    <Layout>
      <Container>
        <section className="newsTitle">
          <h1 className="fs-2 fw-bold">Автоновини</h1>
        </section>
        <section className="newsMainContainer">
          <div className="newsMainImageNews">
            <img
              src={news[0].imageLink ? imagesURL + news[0].imageLink : ImagePlaceholder}
              alt={`News`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = ImagePlaceholder;
              }}
            />
            <NewsTextCardBig news={news[0]} userId={userId} displayOffcanvas={displayOffcanvas} />
          </div>
          <div className="newsMainNews">
            {news.slice(1, 5).map((news, index) => (
              <NewsTextCardBig news={news} userId={userId} displayOffcanvas={displayOffcanvas} />
            ))}
          </div>
        </section>
        <section className="newsInterestingContainer">
          <h2 className="fs-4 fw-bold">Вас може зацікавити</h2>
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={24}
            navigation={true}
            modules={[Navigation]}
            grabCursor={true}
            className="newsSwiper">
            {news
              .slice()
              .sort((a, b) => b.likes.length - a.likes.length)
              .map((news, index) => (
                <SwiperSlide key={`news-interesting-${index}`}>
                  <img
                    src={news.imageLink ? imagesURL + news.imageLink : ImagePlaceholder}
                    alt={`News`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = ImagePlaceholder;
                    }}
                  />
                  <NewsTextCard news={news} userId={userId} displayOffcanvas={displayOffcanvas} />
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
        <section className="newsInterestingTodayContainer">
          <h2 className="fs-4 fw-bold">Найцікавіше за сьогодні</h2>
          <Swiper
            slidesPerView={2}
            spaceBetween={40}
            navigation={true}
            modules={[Navigation]}
            grabCursor={true}
            className="newsSwiper">
            {news
              .filter((news) => isToday(new Date(news.writingTime)))
              .sort((a, b) => b.likes.length - a.likes.length)
              .map((news, index) => (
                <SwiperSlide key={`news-interesting-today-${index}`}>
                  <img
                    src={news.imageLink ? imagesURL + news.imageLink : ImagePlaceholder}
                    alt={`News`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = ImagePlaceholder;
                    }}
                  />
                  <NewsTextCardBig
                    news={news}
                    userId={userId}
                    displayOffcanvas={displayOffcanvas}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
        <AuthOffcanvas showOffcanvas={showOffcanvas} setShowOffcanvas={setShowOffcanvas} />
      </Container>
    </Layout>
  );
};

const isToday = (date) => {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
