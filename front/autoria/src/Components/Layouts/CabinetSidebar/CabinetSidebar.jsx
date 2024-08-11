import React from 'react';
import './CabinetSidebar.css';
import { Link } from 'react-router-dom';

// import images
import ImagePlaceholder from '../../../assets/placeholder-image.png';

export const CabinetSidebar = ({ user }) => {
  return (
    <div className="cabinetSidebar">
      <h1 className="fs-3">Особистий кабінет</h1>
      <div className="cabinetSidebarUser d-flex gap-3">
        <div className="cabinetSidebarUserImg">
          <Link to="../cabinet/edit">
            <img
              className="rounded-circle"
              width="50px"
              height="50px"
              src={user.imageLink ?? ImagePlaceholder}
              alt="User Image"
            />
          </Link>
        </div>
        <div className="cabinetSidebarUserInfo">
          <Link to="../cabinet/edit">
            {user.name}
          </Link>
          <div>{user.phone}</div>
        </div>
      </div>
      <Link to="/add-car" className="btn btn-outline-primary">
        + Додати оголошення
      </Link>
    </div>
  );
};
