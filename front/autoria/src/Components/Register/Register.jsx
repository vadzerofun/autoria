import React from "react";
// import "./Register.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Register = () => {
    return (
        // <div className="loginPage">
        //   <div className="formContainer">
        //       <h2 className="formTitle">Реєстрація на сайті autoria</h2>
        //       <form className="addUserForm">
        //           <div className="inputGroup">
        //               <label htmlFor="name"></label>
        //               <input
        //                   type="text"
        //                   id="name"
        //                   autoComplete="off"
        //                   placeholder="Ім'я"
        //               />
        //               <label htmlFor="surname"></label>
        //               <input
        //                   type="text"
        //                   id="surname"
        //                   autoComplete="off"
        //                   placeholder="Прізвище"
        //               />
        //               <label htmlFor="phoneemail"></label>
        //               <input
        //                   type="text"
        //                   id="phoneemail"
        //                   autoComplete="off"
        //                   placeholder="Телефон або e-mail"
        //               />
        //               <button type="submit" className="button">
        //                 Продовжити
        //               </button>
        //               <a href="/login" className="anchor formAnchor">Вже зареєстровані?</a>
        //           </div>
        //       </form>
        //   </div>
        // </div>
        <div className="login">
            <div className="loginLogo">
                <img src="/src/assets/logo.png" alt="" />
            </div>
            <h1 className="loginTitle">Вітаємо</h1>
            <Form className="loginForm">
                <Form.Group className="mb-3" controlId="name">
                    <Form.Control
                        type="text"
                        placeholder="Ім'я"
                        aria-label="Name"
                        className="loginFormInput"
                    />
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="phone">
                    <Form.Label
                        column                        
                        xs="2"
                        className="loginFormInputFont loginFormPhoneLabel"
                    >
                        +380
                    </Form.Label>
                    <Col xs="10">
                        <Form.Control
                            type="tel"
                            placeholder="Пароль"
                            className="loginFormInput"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        className="loginFormInput"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Control
                        type="password"
                        placeholder="Пароль"
                        aria-label="Password"
                        className="loginFormInput"
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className="loginFormBtn"
                >
                    Зареєструватися
                </Button>
            </Form>
        </div>
    );
};
