import React from 'react';
import { formatNumber } from '../../Services/formatService';
import { getCurrency } from '../../Services/carService';
import ImagePlaceholder from '../../assets/placeholder-image.png';
import './FavoriteCarCard.css';

export const FavoriteCarCard = ({car}) => {
  // images
  const imagesURL = import.meta.env.VITE_IMAGES_URL;
  return (
    <div className="favoriteCarCard">
      <img
        className="favoriteCarImage"
        src={car.imagesPath.length ? imagesURL + car.imagesPath[0] : ImagePlaceholder}
        alt={`Car`}
      />
      <div className="favoriteCarCardMain">
        <span className="favoriteCarCardTitle fs-6">{`${car.make} ${car.model}`}</span>
        <span className="favoriteCarCardPrice fs-6">{`${formatNumber(car.price)} ${getCurrency(
          car.сurrency
        )}`}</span>
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
  );
};
