import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { LoginRegister } from '../LoginRegister/LoginRegister';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';
import './AuthOffcanvas.css';

export const AuthOffcanvas = ({ showOffcanvas, setShowOffcanvas }) => {
  // showOffcanvas
  // const [show, setShow] = useState(showOffcanvas);

  const handleClose = () => setShowOffcanvas(false);

  // activeComponent
  const [activeComponent, setActiveComponent] = useState(0);

  // initialize show
  useEffect(() => {
    setShowOffcanvas(showOffcanvas);
    setActiveComponent(0);
  }, [showOffcanvas]);

  // authComponents
  const authComponents = [
    <LoginRegister setActiveComponent={setActiveComponent} />,
    <Login setActiveComponent={setActiveComponent} closeOffcanvas={handleClose}/>,
    <Register setActiveComponent={setActiveComponent} />,
    <ForgotPassword setActiveComponent={setActiveComponent} />
  ];

  return (
    <>
      <Offcanvas className="authOffcanvas" show={showOffcanvas} onHide={handleClose} placement={'end'}>
        <Offcanvas.Body>
          {/* <LoginRegister /> */}
          {authComponents.map((component, index) => (
            <div key={`${component.type.name}-Component`}>
              {index === activeComponent && component}
            </div>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
