import React, { useEffect, useState } from 'react';
import './Register.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Message } from '../Message/Message';

import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export const Register = ({ setActiveComponent }) => {
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

  // useState
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // get URL
  const baseUrl = `${window.location.protocol}//${window.location.host}/`;

  // searchParams
  const [searchParams] = useSearchParams();
  let success = searchParams.get('register-success');
  
  if (success !== undefined && success !== null) {
    if (success == true) {     
            
      return (
        <Message
          title="Вітаємо"
          msgText="Ви успішно зареєструвались"
          linkText="Далі"
          clearURL={true}
          activeComponent={0}
          setActiveComponent={setActiveComponent}
          hideMessage={hideMessage}
        />
      );
    } else {
      <Message
        title="Упс"
        msgText="Щось пішло не так"
        linkText="Повторити"
        clearURL={true}
        activeComponent={2}
        setActiveComponent={setActiveComponent}
        hideMessage={hideMessage}
      />;
    }
  }

  // onClick
  const createUser = (e) => {
    e.preventDefault();

    axios
      .post(import.meta.env.VITE_REACT_API_URL + 'User/Register', {
        name: username,
        phone: '+380' + phone,
        email: email,
        password: password
      })
      .then((response) => {
        axios
          .post(import.meta.env.VITE_REACT_API_URL + 'User/SendConfirmEmail', {
            email: email,
            successLink: baseUrl + '?register-success=1',
            badLink: baseUrl + '?register-success=0'
          })
          .then((response) => {
            setMessage({
              ...message,
              title: 'Вітаємо',
              msgText: `На адресу ${email} було надіслано повідомлення з підтвердженням`,
              linkText: 'Далі',
              activeComponent: 1,
              setActiveComponent: setActiveComponent,
              hideMessage: hideMessage
            });
            setShowMessage(true);
          })
          .catch((error) => {
            console.log(error);
            setMessage({
              title: 'Упс',
              msgText: 'Щось пішло не так',
              linkText: 'Повторити',
              activeComponent: 2,
              setActiveComponent: setActiveComponent,
              hideMessage: hideMessage
            });
            setShowMessage(true);
          });
      })
      .catch((error) => {
        console.log(error);
        setMessage({
          title: 'Упс',
          msgText: 'Щось пішло не так',
          linkText: 'Повторити',
          activeComponent: 2,
          setActiveComponent: setActiveComponent,
          hideMessage: hideMessage
        });
        setShowMessage(true);
      });
  };

  // guid
  function uuidv4() {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
      (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
    );
  }

  return (
    <>
      {showMessage ? (
        <Message {...message} />
      ) : (
        <div className="login">
          <div className="loginLogo">
            <img src="/src/assets/logo.png" alt="" />
          </div>
          <h1 className="loginTitle">Вітаємо</h1>
          <Form className="loginForm" encType="">
            <Form.Group className="mb-4" controlId="username">
              <Form.Control
                type="text"
                placeholder="Ім'я"
                aria-label="Username"
                className="loginFormInput"
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Row} className="mb-4" controlId="phone">
              <Col className="pe-1" xs="3">
                <Form.Label className="loginFormInput loginFormPhoneLabel">+380</Form.Label>
              </Col>
              <Col xs="9">
                <Form.Control
                  type="tel"
                  placeholder="Номер телефону"
                  className="loginFormInput"
                  required
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-4" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                aria-label="Email"
                className="loginFormInput"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="password">
              <Form.Control
                type="password"
                placeholder="Пароль"
                aria-label="Password"
                className="loginFormInput"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Check
              type="switch"
              id="privacyPolicySwitch"
              label="Я приймаю всі правила конфіденційності"
              className="mb-4 customFormSwitch"
              reverse
              required
            />
            <Button variant="primary" type="submit" className="loginFormBtn" onClick={createUser}>
              Завершити
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};
