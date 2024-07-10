import React from "react";

export const Login = () => {
    return (
        <div className="loginPage">
            <div className="formContainer">
                <h2 className="formTitle">Вхід на сайт autoria</h2>
                <form className="addUserForm">
                    <div className="inputGroup">                        
                        <label htmlFor="phoneemail"></label>
                        <input
                            type="text"
                            id="phoneemail"
                            autoComplete="off"
                            placeholder="Телефон або e-mail"
                        />
                        <label htmlFor="password"></label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            placeholder="Пароль"
                        />
                        <button type="submit" className="button">
                            Увійти
                        </button>
                        <a href="/register" className="anchor formAnchor">
                            Зареєструватися на autoria
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};
