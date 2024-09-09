import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { CabinetLayout } from '../../../Components/Layouts/CabinetLayout/CabinetLayout';
import { PaymentForm } from '../../../Components/PaymentForm/PaymentForm';

export const Balance = () => {
  return (
    <CabinetLayout>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8">
            <PaymentForm />
          </Col>
        </Row>
      </Container>
    </CabinetLayout>
  );
};
