import React, { useState } from 'react';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import Container from 'react-bootstrap/esm/Container';
import './Home.css';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// Import images
import SearchImage from '../../assets/images/cars/car-01.png';
import ImagePlaceholder from '../../assets/placeholder-image.png';

import brandsArray from './brandsArray';
import useLoadHome from '../../Hooks/useLoadHome';
import useToken from '../../Hooks/useToken';
import { NewsCard } from '../../Components/News/NewsCard/NewsCard';
import { getUserIdFromToken } from '../../Services/authService';
import { getCurrency } from '../../Services/carService';
import { formatNumber } from '../../Services/formatService';
import { AuthOffcanvas } from '../../Components/Auth/AuthOffcanvas/AuthOffcanvas';
import { CarCard } from '../../Components/CarCards/CarCard/CarCard';
import { CarCardBig } from '../../Components/CarCards/CarCardBig/CarCardBig';

export const Home = () => {
  // showOffcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const displayOffcanvas = () => {
    setShowOffcanvas(true);
  };

  // images
  const imagesURL = import.meta.env.VITE_IMAGES_URL;
  // user, token
  const { token, setToken } = useToken();
  const [userId, setUserId] = useState(getUserIdFromToken(token));

  // fetch Data
  const { carsForYou, carsMostProfitable, news, loading, error } = useLoadHome();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(carsForYou);
  // console.log(carsMostProfitable);
  // console.log(news);

  return (
    <Layout>
      <section className="homeSection">
        <Container>
          <div className="searchContainer">
            <Row className="row-gap-4">
              <Col sm={12} lg={6}>
                <div className="searchLeft">
                  <h4 className="searchLeftTitle fs-1">Літні знижки на доставку твого сімейного авто</h4>
                  <Form>
                    <Row className="searchDropdowns">
                      <Col className="searchDropdownsLeft" md={6}>
                        <DropdownButton
                          id="dropdown-type"
                          title={
                            <div className="d-flex align-items-center justify-content-between text-text-darkgray">
                              <span>Легкові</span>
                              <span className="searchDropdownToggle"></span>
                            </div>
                          }
                          className="searchDropdownItem">
                          <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                          <Dropdown.Item as="button">Action</Dropdown.Item>
                          <Dropdown.Item as="button">Another action</Dropdown.Item>
                          <Dropdown.Item as="button">Something else</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                          id="dropdown-brand"
                          title={
                            <div className="d-flex align-items-center justify-content-between text-text-darkgray">
                              <span>Марка</span>
                              <span className="searchDropdownToggle"></span>
                            </div>
                          }
                          className="searchDropdownItem">
                          <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                          <Dropdown.Item as="button">Action</Dropdown.Item>
                          <Dropdown.Item as="button">Another action</Dropdown.Item>
                          <Dropdown.Item as="button">Something else</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                          id="dropdown-model"
                          title={
                            <div className="d-flex align-items-center justify-content-between text-text-darkgray">
                              <span>Модель</span>
                              <span className="searchDropdownToggle"></span>
                            </div>
                          }
                          className="searchDropdownItem">
                          <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                          <Dropdown.Item as="button">Action</Dropdown.Item>
                          <Dropdown.Item as="button">Another action</Dropdown.Item>
                          <Dropdown.Item as="button">Something else</Dropdown.Item>
                        </DropdownButton>
                      </Col>
                      <Col className="searchDropdownsRight" md={6}>
                        <DropdownButton
                          id="dropdown-region"
                          title={
                            <div className="d-flex align-items-center justify-content-between text-text-darkgray">
                              <span>Регіон</span>
                              <span className="searchDropdownToggle"></span>
                            </div>
                          }
                          className="searchDropdownItem">
                          <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                          <Dropdown.Item as="button">Action</Dropdown.Item>
                          <Dropdown.Item as="button">Another action</Dropdown.Item>
                          <Dropdown.Item as="button">Something else</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                          id="dropdown-year"
                          title={
                            <div className="d-flex align-items-center justify-content-between text-text-darkgray">
                              <span>Рік випуску</span>
                              <span className="searchDropdownToggle"></span>
                            </div>
                          }
                          className="searchDropdownItem">
                          <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                          <Dropdown.Item as="button">Action</Dropdown.Item>
                          <Dropdown.Item as="button">Another action</Dropdown.Item>
                          <Dropdown.Item as="button">Something else</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                          id="dropdown-price"
                          title={
                            <div className="d-flex align-items-center justify-content-between text-text-darkgray">
                              <span>Ціна, $</span>
                              <span className="searchDropdownToggle"></span>
                            </div>
                          }
                          className="searchDropdownItem">
                          <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                          <Dropdown.Item as="button">Action</Dropdown.Item>
                          <Dropdown.Item as="button">Another action</Dropdown.Item>
                          <Dropdown.Item as="button">Something else</Dropdown.Item>
                        </DropdownButton>
                      </Col>
                      <Col className="searchDropdownsBottom" md={12}>
                        <Button className="searchButton">
                          <div className="d-flex align-items-center justify-content-center">
                            <span className="searchButtonIcon"></span>
                            <span>Показати 247 900 оголошень</span>
                          </div>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
              <Col sm={12} lg={6} className="d-flex justify-content-center align-items-center">
                <Image src={SearchImage} fluid />
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <section className="homeSection">
        <Container>
          <div className="recsContainer">
            <div className="recsLeft">
              <h2 className="homeTitle fs-1">Тобі може сподобатись!</h2>
              <Link to={`/cars/${carsForYou[0].id}`} className="noFontStyle">
                {/* <div className="recsLeftCard">
                  <img
                    className="recsLeftImage"
                    src={
                      carsForYou[0].imagesPath.length
                        ? imagesURL + carsForYou[0].imagesPath[0]
                        : ImagePlaceholder
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = ImagePlaceholder;
                    }}
                    alt="Recommended car"
                  />
                  <div className="recsLeftCardMain">
                    <span className="recsLeftCardTitle fs-4">{`${carsForYou[0].make} ${carsForYou[0].model}`}</span>
                    <span className="recsLeftCardPrice fs-4">{`${formatNumber(
                      carsForYou[0].price
                    )} ${getCurrency(carsForYou[0].сurrency)}`}</span>
                  </div>
                  <div className="recsLeftCardDetails">
                    <div>
                      <span>{`${carsForYou[0].engine_type == 1 ? 'Бензин' : 'Дизель'} ${
                        carsForYou[0].engine_capacity
                      } л`}</span>
                      <span>{carsForYou[0].year} р</span>
                    </div>
                    <div>
                      <span>{`${formatNumber(carsForYou[0].mileage)} км`}</span>
                      <span>{carsForYou[0].region}</span>
                    </div>
                  </div>
                </div> */}
                <CarCardBig
                  car={carsForYou[0]}
                  userId={userId}
                  displayOffcanvas={displayOffcanvas}
                />
              </Link>
            </div>
            <div className="recsRight">
              {carsForYou.slice(1, 5).map((car, index) => (
                <Link to={`cars/${car.id}`} className="noFontStyle" key={`rec-${index}`}>
                  <CarCard car={car} userId={userId} displayOffcanvas={displayOffcanvas} />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="homeSection">
        <Container>
          <div className="offersContainer">
            <h2 className="homeTitle fs-1">Найвигідніші пропозиції</h2>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={24}
              grabCursor={true}
              className="offersSwiper">
              {carsMostProfitable.map((car, index) => (
                <SwiperSlide key={`offer-${index}`}>
                  <Link to={`cars/${car.id}`} className="noFontStyle">
                    <CarCard car={car} userId={userId} displayOffcanvas={displayOffcanvas} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Container>
      </section>
      <section className="homeSection">
        <Container>
          <div className="brandsContainer">
            <h2 className="homeTitle fs-1">Шукати по брендам</h2>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={24}
              grabCursor={true}
              className="brandsSwiper">
              {brandsArray.map((brand, index) => (
                <SwiperSlide key={`brand-${index}`}>
                  <Link to="#" className="noFontStyle">
                    <div className="brandCard">
                      <img className="brandImage" src={brand.url} alt={`Brand ${index + 1}`} />
                      <p className="brandName fs-5">{brand.name}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Container>
      </section>
      <section className="homeSection">
        <Container>
          <div className="newsContainer">
            <h2 className="homeTitle fs-1">Авто новини</h2>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={24}
              grabCursor={true}
              className="newsSwiper">
              {news.map((news, index) => (
                <SwiperSlide key={`news-${index}`}>
                  <NewsCard news={news} userId={userId} displayOffcanvas={displayOffcanvas} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Container>
      </section>
      <AuthOffcanvas showOffcanvas={showOffcanvas} setShowOffcanvas={setShowOffcanvas} />
    </Layout>
  );
};
