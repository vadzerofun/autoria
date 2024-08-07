import React from 'react';
import './Layout.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import useToken from '../../../Hooks/useToken';
import { Login } from '../../Auth/Login/Login';

export const Layout = ({ children }) => {  

  return (
    <>
      <div className="wrapper">
          <Header />
          <main>{children}</main>
          <Footer />
      </div>
    </>
  );
};
