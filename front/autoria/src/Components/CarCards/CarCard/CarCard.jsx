import React, { useState } from 'react';
import axios from 'axios';
import { formatNumber } from '../../../Services/formatService';
import { getCurrency } from '../../../Services/carService';
import ImagePlaceholder from '../../../assets/placeholder-image.png';
import './CarCard.css';
import useToken from '../../../Hooks/useToken';
import { refreshAuthToken } from '../../../Services/authService';
import { Button } from 'react-bootstrap';
import { HeartFilledIcon } from '../../Icons/HeartIcon/HeartFilledIcon';
import { HeartIcon } from '../../Icons/HeartIcon/HeartIcon';

export const CarCard = ({ car, userId, displayOffcanvas }) => {
  // images
  const imagesURL = import.meta.env.VITE_IMAGES_URL;
  // useToken
  const { token, setToken } = useToken();

  // liked
  const [liked, setLiked] = useState(car.likes.includes(userId));

  // handleLikeCar
  const handleLikeCar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      displayOffcanvas();
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
    <div className="carCard">
      <img
        className="carImage"
        src={car.imagesPath.length ? imagesURL + car.imagesPath[0] : ImagePlaceholder}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = ImagePlaceholder;
        }}
        alt={`Car`}
      />
      <div className="carCardMain">
        <div className="carCardTitlePrice">
          <span className="carCardTitle fs-6">{`${car.make} ${car.model}`}</span>
          <span className="carCardPrice fs-6">{`${formatNumber(car.price)} ${getCurrency(
            car.сurrency
          )}`}</span>
        </div>
        <Button onClick={handleLikeCar} className="carCardLikeBtn" variant="link">
          {liked ? (
            <HeartFilledIcon color={'var(--bs-primary)'} width={20} height={17} />
          ) : (
            <HeartIcon
              color="var(--bs-darkgray)"
              hoverColor={'var(--bs-primary)'}
              width={20}
              height={17}
            />
          )}
        </Button>
      </div>
      <div className="carCardDetails">
        <div>
          <span>{`${car.engine_type == 0 ? 'Бензин' : 'Дизель'} ${car.engine_capacity} л`}</span>
          <span>{car.year} р</span>
        </div>
        <div>
          <span>{`${formatNumber(car.mileage)} км`}</span>
          <span>{car.region}</span>
        </div>
      </div>
    </div>
  );
};
