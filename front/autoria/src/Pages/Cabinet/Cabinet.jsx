import React, { useRef, useState } from 'react';
import { CabinetLayout } from '../../Components/Layouts/CabinetLayout/CabinetLayout';
import './Cabinet.css';
import { AdIcon } from '../../Components/Icons/AdIcon/AdIcon';
import ImagePlaceholder from '../../assets/placeholder-image.png';
import useLoadCabinet from '../../Hooks/useLoadCabinet';
import useToken from '../../Hooks/useToken';
import { getUserIdFromToken } from '../../Services/authService';
import { formatNumber } from '../../Services/formatService';
import { getCurrency } from '../../Services/carService';
import { Button, Dropdown } from 'react-bootstrap';
import { CarCard } from '../../Components/CarCards/CarCard/CarCard';
import { LoginRegister } from '../../Components/Auth/LoginRegister/LoginRegister';
import { DeleteCarModal } from '../../Components/CarForm/DeleteCarModal/DeleteCarModal';
import Modal from 'react-bootstrap/Modal'; // for modalShow
import { HeartIcon } from '../../Components/Icons/HeartIcon/HeartIcon';
import { FavoriteCarCard } from '../../Components/CarCards/FavoriteCarCard/FavoriteCarCard';
import { Link } from 'react-router-dom';
import { NotificationIcon } from '../../Components/Icons/NotificationIcon/NotificationIcon';
import { EnvelopeIcon } from '../../Components/Icons/EnvelopeIcon/EnvelopeIcon';
import { MyCarCard } from '../../Components/CarCards/MyCarCard/MyCarCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

export const Cabinet = () => {
  // showOffcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const displayOffcanvas = () => {
    setShowOffcanvas(true);
  };
  // modal
  const [modalShow, setModalShow] = useState(false);
  const [modalCar, setModalCar] = useState({});
  // token, user
  const { token } = useToken();

  if (!token) {
    return <CabinetLayout></CabinetLayout>;
  }

  const userId = getUserIdFromToken(token);

  // cars, marks
  const { cars, favoriteCars, marks, notifications, loading, error } = useLoadCabinet(userId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // set marks
  cars.forEach((car) => {
    car.make = marks.find((mark) => mark.id === car.makeId)?.name;
  });
  favoriteCars.forEach((car) => {
    car.make = marks.find((mark) => mark.id === car.makeId)?.name;
  });

  return (
    <CabinetLayout>
      <section className="d-flex flex-column gap-5">
        <div className="notificationsContainer">
          <div className="iconTitleContainer notificationsIconTitle">
            <div className="cabinetIconContainer">
              <NotificationIcon color="var( --bs-primary )" width={16} height={20} />
            </div>
            <h2 className="iconTitleText">Сповіщення</h2>
            <span
              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center lh-1 countCircleText"
              style={{ width: '27px', height: '26px' }}>
              {notifications.length}
            </span>
          </div>
          {/* Notifications */}
          <Button className="cabinetButton" href="/cabinet/notifications">
            Переглянути усі сповіщення
          </Button>
        </div>
        <div className="favoritesContainer">
          <div className="favoritesHeader">
            <div className="iconTitleContainer">
              <div className="cabinetIconContainer">
                <HeartIcon color="var( --bs-primary )" width={17} height={15} />
              </div>
              <h2 className="iconTitleText">Обране</h2>
              <span
                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center lh-1 countCircleText"
                style={{ width: '27px', height: '26px' }}>
                {favoriteCars.length}
              </span>
            </div>
            <div className="favoritesSeeAll">
              <Link to="/cabinet/favorite-cars">Переглянути усе</Link>
            </div>
          </div>
          <div className="favoritesCards">
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={24}
              navigation={true}
              modules={[Navigation]}
              grabCursor={true}
              className="favoritesSwiper">
              {favoriteCars.map((car, index) => (
                <SwiperSlide key={`favoriteCar-${index}`}>
                  <Link to={`/cars/${car.id}`} className="noFontStyle">
                    <FavoriteCarCard
                      car={car}
                      userId={userId}
                      displayOffcanvas={displayOffcanvas}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="subscriptionsContainer">
          <div className="iconTitleContainer">
            <div className="cabinetIconContainer">
              <EnvelopeIcon color="var( --bs-primary )" width={26} height={26} />
            </div>
            <h2 className="iconTitleText">Підписка</h2>
          </div>
          <div className="subscriptionsTextBtn">
            <p className="subscriptionsText">
              Оформіть підписку на DriveDreams і ваші оголошення завжди будуть в топі
            </p>
            <Button className="cabinetButton" href="/cabinet/subscribe-cars">
              Підписатись
            </Button>
          </div>
        </div>
        <div className="adsContainer">
          <div className="adsHeader">
            <div className="iconTitleContainer">
              <AdIcon color="var( --bs-primary )" />
              <h2 className="iconTitleText">Мої оголошення</h2>
            </div>
            <Button className="cabinetButton mySubsBtn" href="/cabinet/subscriptions">
              Мої підписки
            </Button>
          </div>
          <div className="adsCards">
            {cars.map((car, index) => (
              <Dropdown key={`car-${index}`} drop="end" align="start">
                <Dropdown.Toggle as={CustomToggle}>
                  <MyCarCard car={car} />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  popperConfig={{
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 16]
                        }
                      }
                    ]
                  }}>
                  <Dropdown.Item href={`/cars/${car.id}`}>Перейти</Dropdown.Item>
                  <Dropdown.Item href={`/cabinet/edit-car/${car.id}`}>Редагувати</Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    onClick={() => {
                      setModalShow(true);
                      setModalCar(car);
                    }}>
                    Видалити
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ))}
          </div>
        </div>
      </section>
      <DeleteCarModal show={modalShow} car={modalCar} onHide={() => setModalShow(false)} />
    </CabinetLayout>
  );
};

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    className="noFontStyle"
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}>
    {children}
  </a>
));
