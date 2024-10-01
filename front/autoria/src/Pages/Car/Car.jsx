import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import useLoadCarPage from '../../Hooks/useLoadCarPage';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { HeartFilledIcon } from '../../Components/Icons/HeartIcon/HeartFilledIcon';
import { HeartIcon } from '../../Components/Icons/HeartIcon/HeartIcon';
import useToken from '../../Hooks/useToken';
import { getUserIdFromToken, refreshAuthToken } from '../../Services/authService';
import { AuthOffcanvas } from '../../Components/Auth/AuthOffcanvas/AuthOffcanvas';
import { CarCard } from '../../Components/CarCards/CarCard/CarCard';

export const Car = () => {
  // showOffcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false); 
  const displayOffcanvas = () => {
    setShowOffcanvas(true);
  }; 
  // useToken
  const { token, setToken } = useToken();
  // userId
  const userId = getUserIdFromToken(token);
  // useNavigate
  const navigate = useNavigate();

  // Swiper Thumbs
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // imagesURL
  const imagesURL = import.meta.env.VITE_IMAGES_URL;

  // setOpen
  const [openDescription, setOpenDescription] = useState(false);
  
  // fetch car and user
  const { car, user, marks, models, similarCars, loading, error } = useLoadCarPage();  
  const mark = marks.find((mark) => mark.id === car.makeId)?.name;
  const model = models.find((model) => model.id === car.modelId)?.name;  
  // set marks
  similarCars.forEach((car) => {
    car.make = marks.find((mark) => mark.id === car.makeId)?.name;
    car.model =  models.find((model) => model.id === car.modelId)?.name;  
  });

  // liked
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (car) {
      setLiked(car.likes.includes(userId));
    }
  }, [car, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // car description
  const description = formatDescription(car.description);

  console.log(car);

  // handleLikeCar
  const handleLikeCar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token || !token.token) {
      setShowOffcanvas(true);
      return;
    }

    setLiked(!liked);

    likeCar().catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        refreshAuthToken(token, setToken).then(() => {
          likeCar();
        });
      }
    });
  };

  // likeCar
  const likeCar = () => {
    return axios.post(
      import.meta.env.VITE_REACT_API_URL + 'Cars/Like' + `?Id=${car.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token.token}`
        }
      }
    );
  };  

  return (
    <Layout>
      <section className="homeSection carGallerySection">
        <Container>
          <div className="carGalleryContainer">
            <div className="carGallerySwiper">
              <Swiper
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
                <div className="carGalleryCarTitleYear">
                  <h1 className="carGalleryCarTitle fs-2">{`${mark} ${model}`}</h1>
                  <div className="carGalleryCarYear fs-5">
                    <span>{!car.owners_number ? 'Невживана' : 'Вживана'}</span>
                    <span className="carGalleryInfoPoint"></span>
                    <span>{car.year}</span>
                  </div>
                </div>
                <Button onClick={handleLikeCar} className="carLikeBtn" variant="link">
                  {liked ? (
                    <HeartFilledIcon
                      color={'var(--bs-primary)'}
                      width={26}
                      height={23}
                    />
                  ) : (
                    <HeartIcon
                      color="var(--bs-darkgray)"
                      hoverColor={'var(--bs-primary)'}
                      width={26}
                      height={23}
                    />
                  )}
                </Button>
                <div className="carGalleryCarPrice fs-2">
                  {formatNumber(car.price)} {getCurrency(car.сurrency)}
                </div>
              </div>
              <div className="carGallerySellerInfo">
                <div className="carGallerySellerText">
                  <div className="fw-medium">Продавець</div>
                  <div className="carGallerySellerName fs-5">
                    <span>{car.sellerName}</span>
                    {car.city && (
                      <>
                        <span className="carGalleryInfoPoint"></span>
                        <span>{car.city}</span>
                      </>
                    )}
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
                      <img className="carGallerySellerIcon" src={carIcons.UserCar} alt="Chat Icon" />
                      <span>Останній раз на сайті {formatLastVisited(user.lastVisitedDate)}</span>
                    </div>
                    <div className="carGallerySellerIconItem">
                      <img
                        className="carGallerySellerIcon"
                        src={carIcons.ChatCar}
                        alt="Profile Icon"
                      />
                      <span>З Drive Dreams від {user.createdTime.substring(0, 4)}</span>
                    </div>
                  </div>
                </div>
                <ContactSellerButton car={car} icon={carIcons.ChatWhite} />
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
              navigation={true}
              modules={[Navigation]}
              grabCursor={true}
              className="similarSwiper">
              {similarCars.map((car, index) => (
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
      <AuthOffcanvas showOffcanvas={showOffcanvas} setShowOffcanvas={setShowOffcanvas} />
    </Layout>
  );
};

// formatDescription
const formatDescription = (text) => {
  if (text) {
    return text.split('\n\r');
  }
  return [''];
};

// formatLastVisited
const formatLastVisited = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
