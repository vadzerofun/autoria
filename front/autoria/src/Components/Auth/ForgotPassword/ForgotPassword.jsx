import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './ForgotPassword.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Message } from '../Message/Message';

export const ForgotPassword = ({ setActiveComponent }) => {
  // hide message
  const hideMessage = () => {
    setShowMessage(false);
  };
  // msg
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({
    title: '',
    msgText: '',
    linkText: '',
    activeComponent: 0,
    setActiveComponent: setActiveComponent,
    hideMessage: hideMessage
  });

  // phase
  const [phase, setPhase] = useState(1);
  // location
  let location = useLocation();
  const forgotPasswordURL = `${window.location.protocol}//${window.location.host}${location.pathname}`;
  // params
  let { token } = useParams();
  // navigate
  const navigate = useNavigate();

  // email, password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // forgotPassword
  const forgotPassword = (e) => {
    e.preventDefault();

    axios
      .post(
        `${
          import.meta.env.VITE_REACT_API_URL
        }User/ForgotPassword?Email=${email}&Link=${forgotPasswordURL}`
      )
      .then((response) => {
        setMessage({
          title: 'Вітаємо',
          msgText: `На адресу ${email} було надіслано повідомлення з посиланням на зміну паролю`,
          linkText: 'Далі',
          activeComponent: 1,
          setActiveComponent: setActiveComponent,
          hideMessage: hideMessage
        });
        setPhase(2);
      })
      .catch((error) => {
        console.error(error);
        setMessage({
          title: 'Упс',
          msgText: 'Щось пішло не так',
          linkText: 'Повторити',
          activeComponent: 3,
          setActiveComponent: setActiveComponent,
          hideMessage: hideMessage
        });
        setPhase(2);
      });
  };
  // changePassword
  const changePassword = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert('Пароль і Підтвердження паролю мають бути однаковими');
    }

    axios
      .post(
        `${
          import.meta.env.VITE_REACT_API_URL
        }User/ChengeForgotPassword?NewPassword=${encodeURIComponent(
          password
        )}&Token=${encodeURIComponent(token)}`
      )
      .then((response) => {
        setMessage({
          title: 'Вітаємо',
          msgText: `Пароль успішно змінений`,
          linkText: 'Далі',
          activeComponent: 1,
          setActiveComponent: setActiveComponent,
          hideMessage: hideMessage
        });
        setShowMessage(true);
      })
      .catch((error) => {
        console.error(error);
        setMessage({
          title: 'Упс',
          msgText: 'Щось пішло не так',
          linkText: 'Повторити',
          activeComponent: 3,
          setActiveComponent: setActiveComponent,
          hideMessage: hideMessage
        });
        setPhase(2);
      });
  };

  return (
    <div className="login">
      {token ? (
        <>
          {showMessage ? (
            <Message {...message} />
          ) : (
            <>
              <div className="loginLogo">
                <img src="/src/assets/logo.png" alt="logo" />
              </div>
              <h1 className="loginTitle">Вітаємо</h1>
              <Form className="loginForm">
                <Form.Group className="mb-3" controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Новий пароль"
                    aria-label="Password"
                    className="loginFormInput"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="passwordConfirmation">
                  <Form.Control
                    type="password"
                    placeholder="Введіть повторно новий пароль"
                    aria-label="Password confirmation"
                    className="loginFormInput"
                    onChange={(e) => {
                      setPasswordConfirmation(e.target.value);
                    }}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="loginFormBtn forgotPasswordBtn"
                  onClick={changePassword}>
                  Далі
                </Button>
              </Form>
            </>
          )}
        </>
      ) : phase === 1 ? (
        <>
          <div className="loginLogo">
            <img src="/src/assets/logo.png" alt="logo" />
          </div>
          <h1 className="loginTitle">Відновлення паролю</h1>
          <Form className="loginForm">
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                aria-label="Email"
                className="loginFormInput"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="loginFormBtn forgotPasswordBtn"
              onClick={forgotPassword}>
              Далі
            </Button>
          </Form>
        </>
      ) : phase === 2 ? (
        <Message {...message} />
      ) : (
        <></>
      )}
    </div>
  );
};
