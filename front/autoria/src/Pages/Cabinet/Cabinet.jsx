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
import { Dropdown } from 'react-bootstrap';
import { CarCard } from '../../Components/CarCard/CarCard';
import { LoginRegister } from '../../Components/Auth/LoginRegister/LoginRegister';
import { DeleteCarModal } from '../../Components/CarForm/DeleteCarModal/DeleteCarModal';
import Modal from 'react-bootstrap/Modal'; // for modalShow
import { HeartIcon } from '../../Components/Icons/HeartIcon/HeartIcon';
import { FavoriteCarCard } from '../../Components/FavoriteCarCard/FavoriteCarCard';
import { Link } from 'react-router-dom';

export const Cabinet = () => {
  // images
  const imagesURL = import.meta.env.VITE_IMAGES_URL;
  // modal
  const [modalShow, setModalShow] = useState(false);
  const [modalCar, setModalCar] = useState({});
  // token, user
  const { token } = useToken();

  if (!token) {
    return <LoginRegister />;
  }

  const userId = getUserIdFromToken(token);

  // cars
  const { cars, favoriteCars, loading, error } = useLoadCabinet(userId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <CabinetLayout>
      <section className="d-flex flex-column gap-5 gap-lg-6">
        <div className="favoritesContainer">
          <div className="iconTitleContainer favoritesIconTitle">
            <HeartIcon color="var( --bs-primary )" width={26} height={24} />
            <h2 className="iconTitleText">Обране</h2>
            <span
              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center lh-1 countCircleText"
              style={{ width: '27px', height: '26px' }}>
              {favoriteCars.length}
            </span>
          </div>
          <div className="adsCards">
            {favoriteCars.map((car, index) => (
              <Link to={`/cars/${car.id}`} key={`favoriteCar-${index}`} className="noFontStyle">
                <FavoriteCarCard car={car} />
              </Link>
            ))}
          </div>
        </div>
        <div className="adsContainer">
          <div className="iconTitleContainer">
            <AdIcon color="var( --bs-primary )" />
            <h2 className="iconTitleText">Мої оголошення</h2>
          </div>
          <div className="adsCards">
            {cars.map((car, index) => (
              <Dropdown key={`car-${index}`} drop="end" align="start">
                <Dropdown.Toggle as={CustomToggle}>
                  <CarCard car={car} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href={`/cars/${car.id}`}>Перейти</Dropdown.Item>
                  <Dropdown.Item href={`/cars/${car.id}/edit`}>Редагувати</Dropdown.Item>
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
