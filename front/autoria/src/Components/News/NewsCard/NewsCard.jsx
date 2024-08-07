import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { Link, useNavigate } from 'react-router-dom';
import { HeartIcon } from '../../Icons/HeartIcon/HeartIcon';
import './NewsCard.css';

// Import images
import ImagePlaceholder from '../../../assets/placeholder-image.png';
import { HeartFilledIcon } from '../../Icons/HeartIcon/HeartFilledIcon';

import useToken from '../../../Hooks/useToken';

export const NewsCard = ({ news }) => {
  // images
  const imagesURL = import.meta.env.VITE_IMAGES_URL;
  // useToken
  const { token, setToken } = useToken();
  // useNavigate
  const navigate = useNavigate();

  // liked
  const [liked, setLiked] = useState(false);
  // likes
  const [likesCount, setLikesCount] = useState(news.likes.length);

  // handleClick
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    axios
      .post(
        import.meta.env.VITE_REACT_API_URL + 'News/LikeNews' + `?Id=${news.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        }
      )
      .then((response) => {
        setLiked(!liked);
        liked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
      })
      .catch((err) => {
        console.log(err);        
        navigate('/login');
      });
  };

  return (
    <Link to="/login" className="noFontStyle">
      <div className="newsCard">
        <img
          className="newsImage"
          src={news.imageLink ? imagesURL + news.imageLink : ImagePlaceholder}
          alt={`News`}
        />
        <div className="newsCardTitle fs-6">{news.tittle}</div>
        <div className="newsCardDetails">
          <Button onClick={handleClick} className="newsCardLikeBtn" variant="link">
            {liked ? (
              <HeartFilledIcon color="var( --bs-primary )" />
            ) : (
              <HeartIcon color="var( --bs-primary )" />
            )}
            <span>{formatNumber(likesCount)}</span>
          </Button>
          <div className="newsCardDate">{formatDate(new Date(news.writingTime))}</div>
        </div>
      </div>
    </Link>
  );
};

// formatNumber
const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
    .format(number)
    .replace(/,/g, ' ');
};
// formatDate
function formatDate(date) {
  // Extract components
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  // Format date as "HH:MM DD.MM.YYYY"
  return `${hours}:${minutes} ${day}.${month}.${year}`;
}
