import React from 'react';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import useToken from '../../Hooks/useToken';
import { Login } from '../../Components/Auth/Login/Login';

export const AddCar = () => {
  // token
  const { token, setToken } = useToken();  

  if (!token) {
    return <Login />;
  }

  return (
    <Layout>
      <div>AddCar</div>
    </Layout>
  );
};
