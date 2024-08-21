import React, { useRef, useState } from 'react';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import useLoadCarPage from '../../Hooks/useLoadCarPage';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import imgRecs from '../Home/imgRecs';
import './Car.css';
import Collapse from 'react-bootstrap/esm/Collapse';
import Button from 'react-bootstrap/esm/Button';
import carIcons from './carIcons';
import getCarType from './getCarType';
import getTransmission from './getTransmission';
import getOccasion from './getOccasion';

// Import images
import ImagePlaceholder from '../../assets/placeholder-image.png';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ContactSellerButton } from '../../Components/Car/ContactSellerButton/ContactSellerButton';
import { getCurrency } from '../../Services/carService';
import { formatNumber } from '../../Services/formatService';

export const Car = () => {
  // Swiper Thumbs
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // imagesURL
  const imagesURL = import.meta.env.VITE_IMAGES_URL;

  // setOpen
  const [openDescription, setOpenDescription] = useState(false);
  // carId
  const { carId } = useParams();
  // fetch car and user
  const { car, user, loading, error } = useLoadCarPage(carId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // car description
  // console.log(car.imagesPath);
  const description = formatDescription(car.description);

  console.log(car);

  return (
    <Layout>
      <section className="homeSection carGallerySection">
        <Container>
          <div className="carGalleryContainer">
            <div className="carGallerySwiper">
              <Swiper
                style={{
                  '--swiper-navigation-color': 'rgba(92, 92, 92, 0.7)',
                  '--swiper-pagination-color': 'rgba(92, 92, 92, 0.7)'
                }}                 
                spaceBetween={10}
                navigation={true}
                loop={true}
                modules={[FreeMode, Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="swiperCarGallery">
                {!car.imagesPath.length && (
                  <SwiperSlide>
                    <img src={ImagePlaceholder} />
                  </SwiperSlide>
                )}
                {car.imagesPath.length > 0 &&
                  car.imagesPath.map((path, index) => (
                    <SwiperSlide key={`car-slide-${index}`}>
                      <img src={imagesURL + path} />
                    </SwiperSlide>
                  ))}
              </Swiper>
              {car.imagesPath.length > 1 && (
                <Swiper
                  spaceBetween={10}
                  slidesPerView={2}
                  breakpoints={{
                    640: {
                      slidesPerView: 2
                    },
                    1024: {
                      slidesPerView: 4
                    },
                    1200: {
                      slidesPerView: 6
                    }
                  }}
                  freeMode={true}
                  loop={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  onSwiper={setThumbsSwiper}
                  className="swiperCarGallerySmall">
                  {car.imagesPath.map((path, index) => (
                    <SwiperSlide key={`car-slide-small${index}`}>
                      <img src={imagesURL + path} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <div className="carGalleryInfo">
              <div className="carGalleryCarInfo">
                <h1 className="carGalleryCarTitle fs-2">{`${car.make} ${car.model}`}</h1>
                <div className="carGalleryCarYear fs-5">
                  <span>{!car.owners_number ? 'Невживана' : 'Вживана'}</span>
                  <span className="carGalleryInfoPoint"></span>
                  <span>{car.year}</span>
                </div>
                <div className="carGalleryCarPrice fs-2">
                  {formatNumber(car.price)} {getCurrency(car.сurrency)}
                </div>
              </div>
              <div className="carGallerySellerInfo">
                <div className="carGallerySellerText">
                  <div className="fw-medium">Продавець</div>
                  <div className="carGallerySellerName fs-5">
                    <span>{user.name}</span>
                    <span className="carGalleryInfoPoint"></span>
                    <span>{user.region}</span>
                  </div>
                  <div className="carGallerySellerIcons">
                    <div className="carGallerySellerIconItem">
                      <img
                        className="carGallerySellerIcon"
                        src={carIcons.Checkmark}
                        alt="Checkmark Icon"
                      />
                      <span>Перевірена особа</span>
                    </div>
                    <div className="carGallerySellerIconItem">
                      <img className="carGallerySellerIcon" src={carIcons.Chat} alt="Chat Icon" />
                      <span>Останній раз на сайті {formatLastVisited(user.lastVisitedDate)}</span>
                    </div>
                    <div className="carGallerySellerIconItem">
                      <img
                        className="carGallerySellerIcon"
                        src={carIcons.Profile}
                        alt="Profile Icon"
                      />
                      <span>З Drive Dreams від {user.createdTime.substring(0, 4)}</span>
                    </div>
                  </div>
                </div>
                <ContactSellerButton user={user} icon={carIcons.ChatWhite} />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="homeSection">
        <Container>
          <div className="infoContainer">
            <h2 className="carTitle2 fs-4">Найважливіше</h2>
            <div className="infoImageBoxes">
              <div className="infoImageBoxItem">
                <img className="infoImageBoxImg" src={carIcons.RoadLane} alt="Info Icon" />
                <div className="infoImageBoxText">
                  <span className="infoImageBoxText1">Пробіг</span>
                  <span className="infoImageBoxText2">{formatNumber(car.mileage)} км</span>
                </div>
              </div>
              <div className="infoImageBoxItem">
                <img className="infoImageBoxImg" src={carIcons.CarLightning} alt="Info Icon" />
                <div className="infoImageBoxText">
                  <span className="infoImageBoxText1">
                    Вантажо-
                    <br />
                    підйомність
                  </span>
                  <span className="infoImageBoxText2">{car.carrying_capacity_ton} т</span>
                </div>
              </div>
              <div className="infoImageBoxItem">
                <img className="infoImageBoxImg" src={carIcons.Engine} alt="Info Icon" />
                <div className="infoImageBoxText">
                  <span className="infoImageBoxText1">Об'єм</span>
                  <span className="infoImageBoxText2">{car.engine_capacity} л</span>
                </div>
              </div>
            </div>
            <ul className="infoList">
              <li className="infoListItem">
                <span className="infoListItemName">Тип топлива</span>
                <span className="infoListItemValue">
                  {car.engine_type == 0 ? 'Бензин' : 'Дизель'}
                </span>
              </li>
              <li className="infoListItem">
                <span className="infoListItemName">Тип машини</span>
                <span className="infoListItemValue">{getCarType(car.type)}</span>
              </li>
              <li className="infoListItem">
                <span className="infoListItemName">Привід</span>
                <span className="infoListItemValue">{getOccasion(car.occasion)}</span>
              </li>
              <li className="infoListItem">
                <span className="infoListItemName">Коробка передач</span>
                <span className="infoListItemValue">{getTransmission(car.transmission_type)}</span>
              </li>
              <li className="infoListItem">
                <span className="infoListItemName">Колір</span>
                <span className="infoListItemValue">{car.color}</span>
              </li>
              <li className="infoListItem">
                <span className="infoListItemName">Сидіння</span>
                <span className="infoListItemValue">{car.number_of_seats}</span>
              </li>
              <li className="infoListItem">
                <span className="infoListItemName">Держномер</span>
                <span className="infoListItemValue">{car.car_number}</span>
              </li>
              <li className="infoListItem">
                <span className="infoListItemName">VIN-код</span>
                <span className="infoListItemValue">{car.car_vin_code}</span>
              </li>
              <li className="infoListItem">
                <span className="infoListItemName">ДТП</span>
                <span className="infoListItemValue">{car.road_accident}</span>
              </li>
              <li className="infoListItem">
                <span className="infoListItemName">Стан "В розшуку"</span>
                <span className="infoListItemValue">
                  {car.wanted ? 'В розшуку' : 'Не в розшуку'}
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </section>
      <section className="homeSection">
        <Container>
          <div className="descriptionContainer">
            <h2 className="carTitle2 fs-4 descriptionTitle">Опис</h2>
            <p className="descriptionDemo">{description[0]}</p>
            {description.length > 1 ? (
              <div className="descriptionMore">
                <Collapse in={openDescription}>
                  <div id="car-description-collapse">
                    {description.slice(1, description.length).map((text, index) => (
                      <p key={`description-paragraph-${index}`}>{text}</p>
                    ))}
                  </div>
                </Collapse>
                <Button
                  className="descriptionColapseBtn"
                  variant="link"
                  onClick={() => setOpenDescription(!openDescription)}
                  aria-controls="car-description-collapse"
                  aria-expanded={openDescription}>
                  {!openDescription ? 'Читати більше' : 'Читати менше'}
                </Button>
              </div>
            ) : (
              ''
            )}
          </div>
        </Container>
      </section>
      <section className="carBookSection">
        <Container>
          <div className="bookContainer">
            <p className="bookTitle fs-2">Резервуйте з Drive Dreams</p>
            <p className="bookText">
              Заощаджуйте час у дилерському центрі та при обміні запчастин, якщо вони у вас є,
              налаштовуйте фінансування, якщо хочете, та організовуйте збір або доставку.
            </p>
            <p className="bookText">
              Зарезервуйте свій автомобіль зараз, заплативши 100$, які підлягають поверненню. Це
              захистить автомобіль, щоб ніхто інший не зміг його купити. Потім ви завершите угоду з
              продавцем.
            </p>
            <p className="bookText">
              Заповніть бронювання онлайн на Auto Trader, щоб отримати мінімальну тримісячну
              гарантію. Продавець також перевірить автомобіль та його безпеку.
            </p>
          </div>
        </Container>
      </section>
      <section className="homeSection">
        <Container>
          <div className="similarContainer">
            <h2 className="carTitle2 fs-4">Схоже</h2>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={24}
              grabCursor={true}
              className="similarSwiper">
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
    </Layout>
  );
};

// formatDescription
const formatDescription = (text) => {
  return text.split('\n\r');
};

// formatLastVisited
const formatLastVisited = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
