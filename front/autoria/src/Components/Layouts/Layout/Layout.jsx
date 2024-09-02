import React, { useState } from 'react';
import './Layout.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import useToken from '../../../Hooks/useToken';
import { Login } from '../../Auth/Login/Login';
import { AuthOffcanvas } from '../../Auth/AuthOffcanvas/AuthOffcanvas';

export const Layout = ({ children }) => {
  // showOffcanvas
  // const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <>
      <div className="wrapper">
        <Header />
        <main>{children}</main>
        {/* <AuthOffcanvas showOffcanvas={showOffcanvas} /> */}
        <Footer />
      </div>
    </>
  );
};
