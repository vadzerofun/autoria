import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./ForgotPassword.css";

export const ForgotPassword = () => {
    const [phase, setPhase] = useState(3);

    return (
        <div className="login">
            <div className="loginLogo">
                <img src="/src/assets/logo.png" alt="" />
            </div>
            <h1 className="loginTitle">Відновлення паролю</h1>
            {phase === 1 ? (
                <Form className="loginForm">
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
                            className="loginFormInput"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="loginFormBtn forgotPasswordBtn"
                    >
                        Далі
                    </Button>
                </Form>
            ) : phase === 2 ? (
                <Form className="loginForm">
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Control
                            type="text"
                            placeholder="Код з повідомлення Email"
                            aria-label="Code from Email"
                            className="loginFormInput"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="loginFormBtn forgotPasswordBtn"
                    >
                        Далі
                    </Button>
                </Form>
            ) : phase === 3 ? (
                <Form className="loginForm">
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Control
                            type="password"
                            placeholder="Новий пароль"
                            aria-label="Password"
                            className="loginFormInput"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="passwordConfirmation">
                        <Form.Control
                            type="password"
                            placeholder="Введіть повторно новий пароль"
                            aria-label="Password confirmation"
                            className="loginFormInput"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="loginFormBtn forgotPasswordBtn"
                    >
                        Далі
                    </Button>
                </Form>
            ) : (
                <></>
            )}
        </div>
    );
};
