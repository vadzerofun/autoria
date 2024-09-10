import React, { useEffect, useState } from 'react';
import { CabinetSidebar } from '../CabinetSidebar/CabinetSidebar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import './CabinetLayout.css';
import { LoginRegister } from '../../../Components/Auth/LoginRegister/LoginRegister';
import { Layout } from '../Layout/Layout';
import useToken from '../../../Hooks/useToken';
import useUser from '../../../Hooks/useUser';
import { getUserIdFromToken } from '../../../Services/authService';
import { AuthOffcanvas } from '../../Auth/AuthOffcanvas/AuthOffcanvas';

export const CabinetLayout = ({ children }) => {
  // showOffcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  // token
  const { token, setToken } = useToken();

  if (!token) {
    useEffect(() => {
      setShowOffcanvas(true);
    }, [token]);

    return (
      <Layout>
        <AuthOffcanvas showOffcanvas={showOffcanvas} setShowOffcanvas={setShowOffcanvas} />
      </Layout>
    );
  }

  // user
  const userId = getUserIdFromToken(token);
  const { user, loading, error } = useUser(userId);

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
      <AuthOffcanvas showOffcanvas={showOffcanvas} setShowOffcanvas={setShowOffcanvas} />
    </Layout>
  );
};
