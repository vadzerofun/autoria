import React from 'react';
import './Layout.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import useToken from '../../../Hooks/useToken';
import { Login } from '../../Auth/Login/Login';

export const Layout = ({ children }) => {
  // IMPORTANT! Use in admin dashboard (e.g. AdminLayout)
  // const { token, setToken } = useToken();

  // if(!token) {
  //   return <Login />
  // }

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
