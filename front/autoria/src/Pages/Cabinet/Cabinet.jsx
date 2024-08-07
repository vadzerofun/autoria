import React from 'react';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import { CabinetLayout } from '../../Components/Layouts/CabinetLayout/CabinetLayout';
import useToken from '../../Hooks/useToken';
import { Login } from '../../Components/Auth/Login/Login';

export const Cabinet = () => {
  // token
  const { token, setToken } = useToken();  

  if (!token) {
    return <Login />;
  }

  return (
    <Layout>
      <CabinetLayout><div>Cabinet</div></CabinetLayout>
    </Layout>
  );
};
