import React from 'react';
import { CabinetSidebar } from '../CabinetSidebar/CabinetSidebar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

export const CabinetLayout = ({ children }) => { 

  return (
    <>
      <div className="wrapper">
        <Container>
          <Row>
            <Col md={3}>
              <CabinetSidebar />
            </Col>
            <Col>{children}</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
