import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { Link, useNavigate } from 'react-router-dom';
import './NewsTextCardBig.css';

import useToken from '../../../Hooks/useToken';
import { refreshAuthToken } from '../../../Services/authService';
import { ThumbUpIcon } from '../../Icons/ThumbUpIcon/ThumbUpIcon';
import { ThumbUpFilledIcon } from '../../Icons/ThumbUpIcon/ThumbUpFilledIcon';

export const NewsTextCardBig = ({ news, userId, displayOffcanvas }) => {
  // useToken
  const { token, setToken } = useToken();

  // useNavigate
  const navigate = useNavigate();

  // liked
  const [liked, setLiked] = useState(news.likes.includes(userId));
  // likes
  const [likesCount, setLikesCount] = useState(news.likes.length);

  // handleClick
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      displayOffcanvas();
      return;
    }

    setLiked(!liked);
    liked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);

    likeNews(token.token).catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        refreshAuthToken(token, setToken).then(() => {
          likeNews(token.token);
        });
      }
    });
  };

  // likeNews
  const likeNews = (authToken) => {
    return axios.post(
      import.meta.env.VITE_REACT_API_URL + 'News/LikeNews' + `?Id=${news.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
  };

  return (
    <Link to={news.link} className="noFontStyle">
      <div className="newsTextCardBig">        
        <div className="newsTextCardBigTitle fs-6">{news.tittle}</div>
        <div className="newsTextCardBigDetails">
          <Button onClick={handleClick} className="newsTextCardBigLikeBtn" variant="link">
            {liked ? (
              <ThumbUpFilledIcon color={'var(--bs-primary)'} width={17} height={17} />
            ) : (
              <ThumbUpIcon
                color="var(--bs-darkgray)"
                hoverColor={'var(--bs-primary)'}
                width={17}
                height={17}
              />
            )}
            <span>{formatNumber(likesCount)}</span>
          </Button>
          <div className="newsTextCardBigDate">{formatDate(new Date(news.writingTime))}</div>
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
