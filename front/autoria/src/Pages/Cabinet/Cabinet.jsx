import React, { useRef, useState } from 'react';
import { CabinetLayout } from '../../Components/Layouts/CabinetLayout/CabinetLayout';
import './Cabinet.css';
import { AdIcon } from '../../Components/Icons/AdIcon/AdIcon';
import ImagePlaceholder from '../../assets/placeholder-image.png';
import useGetCarsByUserId from '../../Hooks/useGetCarsByUserId';
import useToken from '../../Hooks/useToken';
import { getUserIdFromToken } from '../../Services/authService';
import { formatNumber } from '../../Services/formatService';
import { getCurrency } from '../../Services/carService';
import { Dropdown } from 'react-bootstrap';
import { CarCard } from '../../Components/CarCard/CarCard';
import { LoginRegister } from '../../Components/Auth/LoginRegister/LoginRegister';
import { DeleteCarModal } from '../../Components/CarForm/DeleteCarModal/DeleteCarModal';
import Modal from 'react-bootstrap/Modal'; // for modalShow

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
  const { cars, loading, error } = useGetCarsByUserId(userId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <CabinetLayout>
      <section>
        <div className="adsContainer">
          <div className="adsIconTitle">
            <AdIcon color="var( --bs-primary )" />
            <h2 className="adsIconTitleText">Мої оголошення</h2>
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
