import React from 'react';
import './LoginRegister.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export const LoginRegister = ({ setActiveComponent }) => {
  return (
    <div className="login">
      <div className="loginRegisterLogo">
        <img src="/src/assets/logo-with-text.png" alt="" />
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
          <img src="/src/assets/icons/apple.svg" alt="" />
        </Button>
        <Button variant="secondary" type="button" className="loginFormBtn loginFormBtnSecondary">
          <img src="/src/assets/icons/google.svg" alt="" />
        </Button>
        <Button variant="secondary" type="button" className="loginFormBtn loginFormBtnSecondary">
          <img src="/src/assets/icons/facebook.svg" alt="" />
        </Button>
      </div>
    </div>
  );
};
