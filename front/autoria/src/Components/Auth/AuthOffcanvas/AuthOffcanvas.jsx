import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { LoginRegister } from '../LoginRegister/LoginRegister';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';
import './AuthOffcanvas.css';
import { useParams, useSearchParams } from 'react-router-dom';

export const AuthOffcanvas = ({ showOffcanvas, setShowOffcanvas }) => {
  // showOffcanvas
  // const [show, setShow] = useState(showOffcanvas);

  // token, params
  let { token } = useParams();

  const [searchParams] = useSearchParams();
  let success = searchParams.get('register-success');  

  const handleClose = () => setShowOffcanvas(false);

  // activeComponent
  const [activeComponent, setActiveComponent] = useState(0);

  // initialize show
  useEffect(() => {
    if (token) {
      setShowOffcanvas(true);
      setActiveComponent(3);      
    }
    else {
      setShowOffcanvas(showOffcanvas);
      setActiveComponent(0);
    }

    if (success !== undefined && success !== null) {
      setShowOffcanvas(true);
      setActiveComponent(2); 
    }
    
  }, [showOffcanvas, token, success]);

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
