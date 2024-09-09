import React, { useState } from 'react';
import axios from 'axios';
import { formatNumber } from '../../../Services/formatService';
import { getCurrency } from '../../../Services/carService';
import ImagePlaceholder from '../../../assets/placeholder-image.png';
import './CarCardBig.css';
import useToken from '../../../Hooks/useToken';
import { refreshAuthToken } from '../../../Services/authService';
import { Button } from 'react-bootstrap';
import { HeartFilledIcon } from '../../Icons/HeartIcon/HeartFilledIcon';
import { HeartIcon } from '../../Icons/HeartIcon/HeartIcon';

export const CarCardBig = ({ car, userId, displayOffcanvas }) => {
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
    <div className="carCardBig">
      <img
        className="carBigImage"
        src={car.imagesPath.length ? imagesURL + car.imagesPath[0] : ImagePlaceholder}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = ImagePlaceholder;
        }}
        alt={`Car`}
      />
      <div className="carCardBigMain">
        <div className="carCardBigTitlePrice">
          <span className="carCardBigTitle fs-4">{`${car.make} ${car.model}`}</span>
          <span className="carCardBigPrice fs-4">{`${formatNumber(car.price)} ${getCurrency(
            car.сurrency
          )}`}</span>
        </div>
        <Button onClick={handleLikeCar} className="carCardBigLikeBtn" variant="link">
          {liked ? (
            <HeartFilledIcon color={'var(--bs-primary)'} width={25} height={22} />
          ) : (
            <HeartIcon
              color="var(--bs-darkgray)"
              hoverColor={'var(--bs-primary)'}
              width={25}
              height={22}
            />
          )}
        </Button>
      </div>
      <div className="carCardBigDetails">
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
