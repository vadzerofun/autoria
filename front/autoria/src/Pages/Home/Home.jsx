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

import SearchImage from '../../assets/images/cars/car-01.png';
import imgRecs from './imgRecs';
import brandsArray from './brandsArray';

export const Home = () => {
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
              <Link to="#" className="noFontStyle">
                <div className="recsLeftCard">
                  <img className="recsLeftImage" src={imgRecs[0]} alt="Recommended car" />
                  <div className="recsLeftCardMain">
                    <span className="recsLeftCardTitle fs-4">Porsche Cayenne Coupé 3.0 340KM</span>
                    <span className="recsLeftCardPrice fs-4">90 000 $</span>
                  </div>
                  <div className="recsLeftCardDetails">
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
            </div>
            <div className="recsRight">
              {imgRecs.slice(1, 5).map((img, index) => (
                <Link to="#" className="noFontStyle" key={`rec-${index}`}>
                  <div className="carCard">
                    <img className="carImage" src={img} alt={`Recommended car ${index + 1}`} />
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
                <SwiperSlide  key={`brand-${index}`}>
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
