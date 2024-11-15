import React, { useState } from 'react';
import axios from 'axios';
import { formatNumber } from '../../../Services/formatService';
import { getCurrency } from '../../../Services/carService';
import ImagePlaceholder from '../../../assets/placeholder-image.png';
import './MyCarCard.css';
import { ViewIcon } from '../../Icons/ViewIcon/ViewIcon';
import { PhoneIcon } from '../../Icons/PhoneIcon/PhoneIcon';
import { ThumbUpIcon } from '../../Icons/ThumbUpIcon/ThumbUpIcon';

export const MyCarCard = ({ car }) => {
  // images
  const imagesURL = import.meta.env.VITE_IMAGES_URL;  
  console.log(car);
  

  return (
    <div className="carCard">
      <img
        className="carImage"
        src={car.imagesPath.length ? imagesURL + car.imagesPath[0] : ImagePlaceholder}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = ImagePlaceholder;
        }}
        alt={`My car`}
      />
      <div className="carCardMain">
        <div className="carCardTitlePrice">
          <span className="carCardTitle fs-6">{`${car.make} ${car.model}`}</span>
          <span className="carCardPrice fs-6">{`${formatNumber(car.price)} ${getCurrency(
            car.сurrency
          )}`}</span>
        </div>        
      </div>
      <div className="myCarCardInfo">
        <div className="myCarCardInfoItem">
          <ViewIcon color="var( --bs-darkgray )" width={24} height={24}/>
          <span>{formatNumber(car.visitedCount)}</span>
        </div>
        <div className="myCarCardInfoItem">
          <PhoneIcon color="var( --bs-darkgray )" width={24} height={24}/>
          <span>{formatNumber(car.sellerPhoneViews)}</span>
        </div>
        <div className="myCarCardInfoItem">
          <ThumbUpIcon color="var( --bs-darkgray )" width={24} height={24}/>
          <span>{formatNumber(car.likes.length)}</span>
        </div>
      </div>      
    </div>
  );
};
