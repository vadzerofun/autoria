import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from '../../../Components/Layouts/Layout/Layout';
import { AuthOffcanvas } from '../../../Components/Auth/AuthOffcanvas/AuthOffcanvas';
import useToken from '../../../Hooks/useToken';
import { Button, Container, Spinner } from 'react-bootstrap';
import { HeartIcon } from '../../../Components/Icons/HeartIcon/HeartIcon';
import './FavoriteCars.css';
import useLoadFavoriteCars from '../../../Hooks/useLoadFavoriteCars';
import { getUserIdFromToken } from '../../../Services/authService';
import { Link } from 'react-router-dom';
import { CarCard } from '../../../Components/CarCards/CarCard/CarCard';
import { FavoriteCarCardBig } from '../../../Components/CarCards/FavoriteCarCardBig/FavoriteCarCardBig';

export const FavoriteCars = () => {
  // showSpinner
  const [showSpinner, setShowSpinner] = useState(false);
  // hideButton
  const [hideButton, setHideButton] = useState(false);
  //favoriteCars
  const [fcPageCurrent, setFcPageCurrent] = useState(1);
  const fcPageSize = 7;
  // showOffcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const displayOffcanvas = () => {
    setShowOffcanvas(true);
  };
  // token
  const { token, setToken } = useToken();

  if (!token) {
    useEffect(() => {
      setShowOffcanvas(true);
    }, [token]);

    return (
      <Layout>
        <AuthOffcanvas showOffcanvas={showOffcanvas} setShowOffcanvas={setShowOffcanvas} />
      </Layout>
    );
  }

  const userId = getUserIdFromToken(token);

  // favoriteCars
  const { favoriteCars, loading, error } = useLoadFavoriteCars(userId);
  console.log(favoriteCars);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleShowMore = () => {
    setShowSpinner(!showSpinner);
    const pageNumber = fcPageCurrent + 1;
    setFcPageCurrent((prev) => prev + 1);
    loadMoreCars(pageNumber);
  };

  const loadMoreCars = (pageNumber) => {
    axios
      .get(`${import.meta.env.VITE_REACT_API_URL}Cars/GetLikedCarsByUserId`, {
        params: { userId: userId, Page: pageNumber, PageSize: fcPageSize }
      })
      .then((response) => {
        const newCarsData = response.data.value;
        if (!newCarsData || newCarsData.length === 0) {
          setHideButton(!hideButton);
          return;
        }
        if (newCarsData && newCarsData.length > 0) {
          favoriteCars.push(...newCarsData);
          if (newCarsData.length < fcPageSize) setHideButton(!hideButton);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowSpinner(false);
      });
  };

  return (
    <Layout>
      <Container>
        <section className="favoriteCarsSearch mb-lg-6 mb-4">
          <div className="favoriteCarsIconTitleContainer">
            <div className="favoriteCarsIconContainer">
              <HeartIcon color="var( --bs-darkgray )" width={26} height={23} />
            </div>
            <h1 className="fs-2 fw-bold">Обране</h1>
          </div>
          <div>TODO</div>
        </section>
        <section className="favoriteCarsCars">
          {/* {topCars && topCars.length > 0 && (
            <div className="favoriteCarsOffers">
              <h2 className="fs-4">Пропозиції дня</h2>

              <div className="favoriteCarsOffersList">
                {topCars.map((car, index) => (
                  <Link to={`/cars/${car.id}`} className="noFontStyle" key={`offer-${index}`}>
                    <CarCard car={car} userId={userId} displayOffcanvas={displayOffcanvas} />
                  </Link>
                ))}
              </div>
            </div>
          )} */}
          {favoriteCars && favoriteCars.length > 0 && (
            <>
              <div className="favoriteCarsList">
                {favoriteCars.map((car, index) => (
                  <Link
                    to={`/cars/${car.id}`}
                    className="noFontStyle"
                    key={`favoriteCars2-${index}`}>
                    <FavoriteCarCardBig
                      car={car}
                      userId={userId}
                      displayOffcanvas={displayOffcanvas}
                    />
                  </Link>
                ))}
              </div>
              <>
                {showSpinner ? (
                  <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    className={`favoriteCarsButton ${hideButton && 'hideButton'}`}
                    onClick={handleShowMore}>
                    Переглянути ще
                  </Button>
                )}
              </>
            </>
          )}
        </section>
        <AuthOffcanvas showOffcanvas={showOffcanvas} setShowOffcanvas={setShowOffcanvas} />
      </Container>
    </Layout>
  );
};
