import React, { useState } from 'react';
import axios from 'axios';
import { formatNumber } from '../../../Services/formatService';
import { getCurrency } from '../../../Services/carService';
import ImagePlaceholder from '../../../assets/placeholder-image.png';
import './FavoriteCarCard.css';
import useToken from '../../../Hooks/useToken';
import { refreshAuthToken } from '../../../Services/authService';
import { Button } from 'react-bootstrap';
import { HeartFilledIcon } from '../../Icons/HeartIcon/HeartFilledIcon';
import { HeartIcon } from '../../Icons/HeartIcon/HeartIcon';

export const FavoriteCarCard = ({ car, userId, displayOffcanvas }) => {
  // images
  const imagesURL = import.meta.env.VITE_IMAGES_URL;
  // useToken
  const { token, setToken } = useToken();

  // liked
  const [liked, setLiked] = useState(car.likes.includes(userId));

  // remove favorite car
  // const [removeCar, setRemoveCar] = useState(false);

  // handleLikeCar
  const handleLikeCar = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      displayOffcanvas();
      return;
    }

    setLiked(!liked);
    // setRemoveCar(!removeCar);

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
    return axios
      .post(
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
    <div className="favoriteCarCard">
      <img
        className="favoriteCarImage"
        src={car.imagesPath.length ? imagesURL + car.imagesPath[0] : ImagePlaceholder}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = ImagePlaceholder;
        }}
        alt={`Car`}
      />
      <div className="favoriteCarCardInfo">
        <div className="favoriteCarCardMain">
          <div className="favoriteCarCardTitlePrice">
            <span className="favoriteCarCardTitle fs-5">{`${car.make} ${car.model}`}</span>
            <span className="favoriteCarCardPrice fs-5">{`${formatNumber(car.price)} ${getCurrency(
              car.сurrency
            )}`}</span>
          </div>
          <Button onClick={handleLikeCar} className="favoriteCarCardLikeBtn" variant="link">
            {liked ? (
              <HeartFilledIcon color={'var(--bs-primary)'} width={21} height={18} />
            ) : (
              <HeartIcon
                color="var(--bs-darkgray)"
                hoverColor={'var(--bs-primary)'}
                width={21}
                height={18}
              />
            )}
          </Button>
        </div>
        <div className="favoriteCarCardDetails">
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
    </div>
  );
};
