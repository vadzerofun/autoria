import React from 'react';
import './LoginRegister.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

// Images
import Logo from '../../../assets/logo-with-text.png';
import AppleLogo from '../../../assets/icons/apple.svg';
import GoogleLogo from '../../../assets/icons/google.svg';
import FacebookLogo from '../../../assets/icons/facebook.svg';

export const LoginRegister = ({ setActiveComponent }) => {
  return (
    <div className="login">
      <div className="loginRegisterLogo">
        <img src={Logo} alt="" />
      </div>
      <div className="loginRegisterButtons">
        <Button
          variant="primary"
          type="button"
          className="loginFormBtn mb-3"
          onClick={() => {
            setActiveComponent(1);
          }}>
          Увійти
        </Button>
        <Button
          variant="secondary"
          type="button"
          className="loginFormBtn loginFormBtnSecondary"
          onClick={() => {
            setActiveComponent(2);
          }}>
          Зареєструватись
        </Button>
      </div>
      <div className="loginRegisterOr">
        <div className="loginRegisterOrLine"></div>
        <span className="loginRegisterOrText">Або увійдіть через</span>
        <div className="loginRegisterOrLine"></div>
      </div>
      <div className="socialMediaButtons">
        <Button variant="secondary" type="button" className="loginFormBtn loginFormBtnSecondary">
          <img src={AppleLogo} alt="" />
        </Button>
        <Button variant="secondary" type="button" className="loginFormBtn loginFormBtnSecondary">
          <img src={GoogleLogo} alt="" />
        </Button>
        <Button variant="secondary" type="button" className="loginFormBtn loginFormBtnSecondary">
          <img src={FacebookLogo} alt="" />
        </Button>
      </div>
    </div>
  );
};
