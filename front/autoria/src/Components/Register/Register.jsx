import React from "react";
import "./Register.css";

export const Register = () => {
    return (
        <div className="loginPage">
          <div className="formContainer">
              <h2 className="formTitle">Реєстрація на сайті autoria</h2>
              <form className="addUserForm">
                  <div className="inputGroup">
                      <label htmlFor="name"></label>
                      <input
                          type="text"
                          id="name"
                          autoComplete="off"
                          placeholder="Ім'я"
                      />
                      <label htmlFor="surname"></label>
                      <input
                          type="text"
                          id="surname"
                          autoComplete="off"
                          placeholder="Прізвище"
                      />
                      <label htmlFor="phoneemail"></label>
                      <input
                          type="text"
                          id="phoneemail"
                          autoComplete="off"
                          placeholder="Телефон або e-mail"
                      />
                      <button type="submit" className="button">
                        Продовжити
                      </button>
                      <a href="/login" className="anchor formAnchor">Вже зареєстровані?</a>
                  </div>
              </form>
          </div>
        </div>
    );
};
