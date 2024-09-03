import React from 'react';
import Button from 'react-bootstrap/Button';
import './Message.css';

export const Message = ({
  title,
  msgText,
  linkText,
  activeComponent,
  setActiveComponent,
  hideMessage
}) => {
  return (
    <div className="login">
      <div className="loginLogo msgLogo">
        <img src="/src/assets/logo.png" alt="" />
      </div>
      <h1 className="loginTitle">{title}</h1>
      <h2 className="msgText">{msgText}</h2>
      <Button
        variant="primary"
        type="button"
        className="loginFormBtn mb-3"
        onClick={() => {
          setActiveComponent(activeComponent);
          hideMessage();
        }}>
        {linkText}
      </Button>
    </div>
  );
};
