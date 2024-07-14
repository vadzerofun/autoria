import React from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

export const Login = () => {
    return (
        // <div className="loginPage">
        //     <div className="formContainer">
        //         <h2 className="formTitle">Вхід на сайт autoria</h2>
        //         <form className="addUserForm">
        //             <div className="inputGroup">
        //                 <label htmlFor="phoneemail"></label>
        //                 <input
        //                     type="text"
        //                     id="phoneemail"
        //                     autoComplete="off"
        //                     placeholder="Телефон або e-mail"
        //                 />
        //                 <label htmlFor="password"></label>
        //                 <input
        //                     type="password"
        //                     id="password"
        //                     autoComplete="off"
        //                     placeholder="Пароль"
        //                 />
        //                 <button type="submit" className="button">
        //                     Увійти
        //                 </button>
        //                 <a href="/register" className="anchor formAnchor">
        //                     Зареєструватися на autoria
        //                 </a>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div className="login">
            <div className="loginLogo">
                <img src="/src/assets/logo.png" alt="" />
            </div>
            <h1 className="loginTitle">Вітаємо</h1>
            <Form className="loginForm">
                <Form.Group
                    className="mb-3"
                    controlId="email"
                >
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        className="loginFormInput"
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="password"
                >
                    <Form.Control
                        type="password"
                        placeholder="Пароль"
                        aria-label="Password"
                        className="loginFormInput"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="loginFormBtn">
                    Увійти
                </Button>
            </Form>
        </div>
    );
};
