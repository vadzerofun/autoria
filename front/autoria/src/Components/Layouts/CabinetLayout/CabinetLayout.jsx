import React from 'react';
import { CabinetSidebar } from '../CabinetSidebar/CabinetSidebar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import './CabinetLayout.css';
import { LoginRegister } from '../../../Components/Auth/LoginRegister/LoginRegister';
import { Layout } from '../Layout/Layout';
import useToken from '../../../Hooks/useToken';
import useUser from '../../../Hooks/useUser';

export const CabinetLayout = ({ children }) => {
  // token
  const { token, setToken } = useToken();
  // user
  const userId = getUserIdFromToken(token);
  const { user, loading, error } = useUser(userId);

  if (!token) {
    return <LoginRegister />;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div className="wrapper cabinetWrapper">
        <Container>
          <div className="cabinetContainer">
            <div className="cabinetSidebarContainer">
              <CabinetSidebar user={user} />
            </div>
            <div className="cabinetMainContainer">{children}</div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

// getUserIdFromToken
const getUserIdFromToken = (token) => {
  if (!token) return null;
  const tokenValue = token.value;
  const arrayToken = tokenValue.split('.');
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  return tokenPayload.sub;
};
