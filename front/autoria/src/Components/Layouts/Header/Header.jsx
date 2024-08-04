import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../../assets/logo.png';
import Heart from '../../../assets/icons/heart.svg';
import Profile from '../../../assets/icons/profile.svg';
import { Link } from 'react-router-dom';
import './Header.css';

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
                Вживані машини
              </Nav.Link>
              <Nav.Link as={Link} to="#">
                Нові машини
              </Nav.Link>
              <Nav.Link as={Link} to="#">
                Продати машину
              </Nav.Link>
              <Nav.Link as={Link} to="#">
                Автозапчастини
              </Nav.Link>
              <Nav.Link as={Link} to="#">
                Новини
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="navbarRight">
            <div className="navbarRightIcons">
              <Link to="#">
                <img src={Heart} alt="Heart" className="img-fluid" width="19px" height="16px" />
              </Link>
              <Link to="/login-register">
                <img src={Profile} alt="Profile" className="img-fluid" width="16px" height="16px" />
              </Link>
            </div>
            <Link to="#" className="navbarRightButton">
              + Продати авто
            </Link>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};
