import React, { useEffect, useState } from 'react';
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
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

// Import images
import SearchImage from '../../assets/images/cars/car-01.png';
import ImagePlaceholder from '../../assets/placeholder-image.png';

import brandsArray from './brandsArray';
import useLoadHome from '../../Hooks/useLoadHome';
import useToken from '../../Hooks/useToken';
import { NewsCard } from '../../Components/News/NewsCard/NewsCard';
import { getUserIdFromToken } from '../../Services/authService';
import { AuthOffcanvas } from '../../Components/Auth/AuthOffcanvas/AuthOffcanvas';
import { CarCard } from '../../Components/CarCards/CarCard/CarCard';
import { CarCardBig } from '../../Components/CarCards/CarCardBig/CarCardBig';
import { SearchForm } from '../../Components/CarForm/SearchForm/SearchForm';

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
  const { carsCount, carsForYou, carsTop, news, marks, loading, error } = useLoadHome();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(carsCount);

  // set marks
  carsForYou.forEach((car) => {
    car.make = marks.find((mark) => mark.id === car.makeId)?.name;   
  });
  carsTop.forEach((car) => {
    car.make = marks.find((mark) => mark.id === car.makeId)?.name;
  });  

  //console.log(carsForYou);
  // console.log(carsTop);
  // console.log(news);

  return (
    <Layout>
      <section className="homeSection">
        <Container>
          <div className="searchContainer">
            <Row className="row-gap-4">
              <Col sm={12} lg={6}>
                <div className="searchLeft">
                  <h4 className="searchLeftTitle fs-1">
                    Літні знижки на доставку твого сімейного авто
                  </h4>
                  {/* <Form>
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
                  </Form> */}
                  <div className="homeSearchFormContainer">
                    <SearchForm marks={marks} carsCount={carsCount} />
                  </div>
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
            <div className="homeTitleSeeAll">
              <h2 className="homeTitle fs-1">Найвигідніші пропозиції</h2>
              <div className="homeSeeAll">
                <Link to="/search-cars">Переглянути усе</Link>
              </div>
            </div>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={24}
              navigation={true}
              modules={[Navigation]}
              grabCursor={true}
              className="offersSwiper">
              {carsTop.map((car, index) => (
                <SwiperSlide key={`offer-${index}`}>
                  <Link to={`/cars/${car.id}`} className="noFontStyle">
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
            <div className="homeTitleSeeAll">
              <h2 className="homeTitle fs-1">Шукати по брендам</h2>
              <div className="homeSeeAll">
                <Link to="/search-cars">Переглянути усе</Link>
              </div>
            </div>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={24}
              navigation={true}
              modules={[Navigation]}
              grabCursor={true}
              className="brandsSwiper">
              {brandsArray.map((brand, index) => (
                <SwiperSlide key={`brand-${index}`}>
                  <Link to={`/search-cars?mark=${brand.name}`} className="noFontStyle">
                    <div className="brandCard">
                      <div className="brandImageContainer">
                        <img className="brandImage" src={brand.url} alt={`Brand ${index + 1}`} />
                      </div>
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
            <div className="homeTitleSeeAll">
              <h2 className="homeTitle fs-1">Авто новини</h2>
              <div className="homeSeeAll">
                <Link to="/news">Переглянути усе</Link>
              </div>
            </div>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={24}
              navigation={true}
              modules={[Navigation]}
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
