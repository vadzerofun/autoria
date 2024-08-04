import React from 'react';
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

import imgRecs from './imgRecs';
import brandsArray from './brandsArray';
import useGetCarsForYou from '../../Hooks/useGetCarsForYou';

export const Home = () => {
  // images
  const imagesURL = import.meta.env.VITE_IMAGES_URL;
  // fetch Cars
  const { carsForYou, loadingForYou, errorForYou } = useGetCarsForYou();
  console.log(carsForYou);

  if (loadingForYou) return <div>Loading...</div>;
  if (errorForYou) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <section className="homeSection">
        <Container>
          <div className="searchContainer">
            <Row className="row-gap-4">
              <Col sm={12} lg={6}>
                <div className="searchLeft">
                  <h4 className="searchLeftTitle">Підбери авто на літо для себе та своєї сім'ї</h4>
                  <Form>
                    <Row className="searchDropdowns">
                      <Col className="searchDropdownsLeft" md={6}>
                        <DropdownButton
                          id="dropdown-type"
                          title={
                            <div className="d-flex align-items-center justify-content-between">
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
                            <div className="d-flex align-items-center justify-content-between">
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
                            <div className="d-flex align-items-center justify-content-between">
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
                            <div className="d-flex align-items-center justify-content-between">
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
                            <div className="d-flex align-items-center justify-content-between">
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
                            <div className="d-flex align-items-center justify-content-between">
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
              <Link to={`cars/${carsForYou[0].id}`} className="noFontStyle">
                <div className="recsLeftCard">
                  <img
                    className="recsLeftImage"
                    src={
                      carsForYou[0].imagesPath.length
                        ? imagesURL + carsForYou[0].imagesPath[0]
                        : ImagePlaceholder
                    }
                    alt="Recommended car"
                  />
                  <div className="recsLeftCardMain">
                    <span className="recsLeftCardTitle fs-4">{`${carsForYou[0].make} ${carsForYou[0].model}`}</span>
                    <span className="recsLeftCardPrice fs-4">{`${formatNumber(
                      carsForYou[0].priceUSD
                    )} $`}</span>
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
                      <span>м. Київ</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="recsRight">
              {carsForYou.slice(1, 5).map((car, index) => (
                <Link to={`cars/${car.id}`} className="noFontStyle" key={`rec-${index}`}>
                  <div className="carCard">
                    <img
                      className="carImage"
                      src={car.imagesPath.length ? imagesURL + car.imagesPath[0] : ImagePlaceholder}
                      alt={`Recommended car ${index + 1}`}
                    />
                    <div className="carCardMain">
                      <span className="carCardTitle fs-6">{`${car.make} ${car.model}`}</span>
                      <span className="carCardPrice fs-6">{`${formatNumber(
                        car.priceUSD
                      )} $`}</span>
                    </div>
                    <div className="carCardDetails">
                      <div>
                        <span>{`${car.engine_type == 0 ? 'Бензин' : 'Дизель'} ${
                          car.engine_capacity
                        } л`}</span>
                        <span>{car.year} р</span>
                      </div>
                      <div>
                        <span>{`${formatNumber(car.mileage)} км`}</span>
                        <span>м. Київ</span>
                      </div>
                    </div>
                  </div>
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
              {imgRecs.slice(5, 9).map((img, index) => (
                <SwiperSlide key={`offer-${index}`}>
                  <Link to="#" className="noFontStyle">
                    <div className="carCard">
                      <img className="carImage" src={img} alt={`Offer ${index + 1}`} />
                      <div className="carCardMain">
                        <span className="carCardTitle fs-6">Porsche Cayenne Coupé 3.0 340KM</span>
                        <span className="carCardPrice fs-6">90 000 $</span>
                      </div>
                      <div className="carCardDetails">
                        <div>
                          <span>Електро, 77.4 кВт-год</span>
                          <span>2019 р</span>
                        </div>
                        <div>
                          <span>65 000 км</span>
                          <span>м. Київ</span>
                        </div>
                      </div>
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
        <Container>Авто новини</Container>
      </section>
    </Layout>
  );
};

// formatNumber
const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
    .format(number)
    .replace(/,/g, ' ');
};
