import React from 'react';
import './LoginRegister.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export const LoginRegister = () => {
  return (
    <div className="login">
      <div className="loginLogo">
        <img src="/src/assets/logo-with-text.png" alt="" />
      </div>
      <div className="loginRegisterButtons">
        <Button variant="primary" type="button" className="loginFormBtn mb-3" href="/login">
          Увійти
        </Button>
        <Button
          variant="secondary"
          type="button"
          className="loginFormBtn loginFormBtnSecondary"
          href="/register">
          Зареєструватись
        </Button>
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
