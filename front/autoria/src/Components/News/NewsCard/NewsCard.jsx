import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { HeartIcon } from '../../Icons/HeartIcon/HeartIcon';
import './NewsCard.css';
import { HeartFilledIcon } from '../../Icons/HeartIcon/HeartFilledIcon';

export const NewsCard = ({ news }) => {
  const [liked, setLiked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    liked ? news.likes.length-- : news.likes.length++;
  };

  return (
    <Link to="/login" className="noFontStyle">
      <div className="newsCard">
        <img className="newsImage" src={news.imgURL} alt={`News`} />
        <div className="newsCardTitle fs-6">{news.title}</div>
        <div className="newsCardDetails">
          <Button onClick={handleClick} className="newsCardLikeBtn" variant="link">
            {liked ? (
              <HeartFilledIcon color="var( --bs-primary )" />
            ) : (
              <HeartIcon color="var( --bs-primary )" />
            )}
            <span>{formatNumber(news.likes.length)}</span>
          </Button>
          <div className="newsCardDate">{news.date}</div>
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
