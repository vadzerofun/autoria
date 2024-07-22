import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const Login = () => {

    const navigate = useNavigate();

    // useState
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Function to set a cookie
    function setCookie(name, value, maxAge) {
        document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
    }

    // onClick
    const loginUser = (e) => {
        e.preventDefault();

        axios
            .post(
                "https://localhost:7224/login?useCookies=false&useSessionCookies=false",
                {
                    email: email,
                    password: password,
                }
            )
            .then((response) => {
                // Set cookies
                console.log(response.data.tokenType);
                setCookie("tokenType", response.data.tokenType, response.data.expiresIn);
                setCookie("accessToken", response.data.accessToken, response.data.expiresIn);
                setCookie("refreshToken", response.data.refreshToken, response.data.expiresIn);
                console.log(response.data);
                navigate("/");
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
                <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                        type="username"
                        placeholder="Ім'я користувача"
                        aria-label="Username"
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
                <div className="d-flex justify-content-center p-3 mb-3">
                    <Link to="/forgot-password">Забули пароль?</Link>
                </div>
                <Button
                    variant="primary"
                    type="submit"
                    className="loginFormBtn"
                    onClick={loginUser}
                >
                    Увійти
                </Button>
            </Form>
        </div>
    );
};
