import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { CabinetLayout } from '../../../Components/Layouts/CabinetLayout/CabinetLayout';
import { PaymentForm } from '../../../Components/PaymentForm/PaymentForm';
import useLoadCourse from '../../../Hooks/useLoadCourse';

export const Balance = () => {
  // fetch Data
  const { course, loading, error } = useLoadCourse();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // console.log(course);  

  return (
    <CabinetLayout>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8">
            <PaymentForm course={course} />
          </Col>
        </Row>
      </Container>
    </CabinetLayout>
  );
};
