import React from 'react';
import './CabinetSidebar.css';
import { Link } from 'react-router-dom';
import { EditIcon } from '../../Icons/EditIcon/EditIcon';
import { ProfileIcon } from '../../Icons/ProfileIcon/ProfileIcon';

// import images
import ImagePlaceholder from '../../../assets/placeholder-image.png';

import Button from 'react-bootstrap/esm/Button';

export const CabinetSidebar = ({ user }) => {
  // console.log(user);

  // imagesURL
  const imagesURL = import.meta.env.VITE_IMAGES_URL;

  return (
    <div className="cabinetSidebar">
      <h1 className="fs-2 fw-bold text-center">Особистий кабінет</h1>
      <div className="cabinetSidebarUser">
        <div className="cabinetSidebarUserInfo">
          {(user.imageLink && (
            <img
              src={imagesURL + user.imageLink}
              alt="User Photo"
              height={40}
              width={40}
              className="object-fit-cover rounded-circle"
            />
          )) || <ProfileIcon color="#5C5C5C" size={40} />}
          <div className="cabinetSidebarUserText">
            <div className="cabinetSidebarUserName fs-5">
              <span>{user.name}</span>
              <span className="cabinetSidebarInfoPoint"></span>
              <span>{user.region}</span>
            </div>
            <span className="cabinetSidebarUserPhone">
              {user.phone ?? 'Вкажіть номер телефону'}
            </span>
          </div>
        </div>
        <div className="cabinetSidebarUserBalance">
          <div className="cabinetSidebarBalanceInfo">
            <span className="cabinetSidebarBalanceLabel">Особистий рахунок</span>
            <span className="cabinetSidebarBalanceSum">0 грн</span>
          </div>
          <Button className="cabinetSidebarBalanceBtn" href="#">
            Поповнити
          </Button>
        </div>
        <Button className="button-font cabinetSidebarBtn" href="/add-car">
          <div className="d-flex align-items-center gap-3">
            <span className="fs-2 fw-semibold">+</span>
            <span className="fs-5 fw-semibold">Додати оголошення</span>
          </div>
        </Button>
        <Link to="/cabinet/edit" className="cabinetSidebarEditBtn">
          <EditIcon color="#5C5C5C" />
        </Link>
      </div>
    </div>
  );
};
