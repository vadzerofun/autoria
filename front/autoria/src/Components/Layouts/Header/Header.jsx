import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../../assets/logo.png';
import Heart from '../../../assets/icons/heart.svg';
import Profile from '../../../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import './Header.css';
import { UserIcon } from '../../Icons/UserIcon/UserIcon';
import { HeartIcon } from '../../Icons/HeartIcon/HeartIcon';

export const Header = () => {
  return (
    <header>
      <Navbar key="lg" expand="lg" className="bg-secondary">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <div className="logoContainer">
                <img src={Logo} alt="Logo" className="img-fluid logoImage" />
                <span className="logoText">DriveDreams</span>
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto navbarText">
              <Nav.Link as={Link} to="#">
                Вживані авто
              </Nav.Link>
              <Nav.Link as={Link} to="#">
                Нові авто
              </Nav.Link>
              <Nav.Link as={Link} to="/cabinet/add-car">
                Продати машину
              </Nav.Link>
              <Nav.Link as={Link} to="#">
                Новини
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="navbarRight">
            <div className="navbarRightIcons">
              <Link to="/cabinet/favorite-cars">
                <HeartIcon
                  color="var(--bs-text-darkgray)"
                  hoverColor="var(--bs-primary)"
                  width={19}
                  height={16}
                />
              </Link>
              <Link to="/cabinet">
                <UserIcon color="var(--bs-text-darkgray)" hoverColor="var(--bs-primary)" />
              </Link>
            </div>
            <Link to="/cabinet/add-car" className="navbarRightButton">
              + Продати авто
            </Link>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};
