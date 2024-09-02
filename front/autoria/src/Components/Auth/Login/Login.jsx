import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useToken from '../../../Hooks/useToken';

import axios from 'axios';

export const Login = ({setActiveComponent, closeOffcanvas}) => {
  const navigate = useNavigate();

  // useState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useToken
  const { token, setToken } = useToken();

  // onClick
  const loginUser = (e) => {
    e.preventDefault();

    axios
      .post(import.meta.env.VITE_REACT_API_URL + 'User/Login', {
        email: email,
        password: password
      })
      .then((response) => {
        // Set token
        const tokenValue = response.data.value;
        setToken(tokenValue);
        closeOffcanvas();
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login">
      <div className="loginLogo">
        <img src="/src/assets/logo.png" alt="" />
      </div>
      <h1 className="loginTitle">Вітаємо</h1>
      <Form className="loginForm">
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
        <Form.Group className="mb-3" controlId="password">
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
        <div className="d-flex justify-content-center p-2 mb-3">
          <Button
            className="loginBtnForgotPassword fs-4 fw-medium"
            variant="link"
            onClick={() => {
              setActiveComponent(3);
            }}>
            Забули пароль?
          </Button>
        </div>
        <Button variant="primary" type="submit" className="loginFormBtn" onClick={loginUser}>
          Увійти
        </Button>
      </Form>
    </div>
  );
};
