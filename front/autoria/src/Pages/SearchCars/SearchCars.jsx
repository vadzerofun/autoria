import React from 'react';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import { Container } from 'react-bootstrap';

export const SearchCars = () => {
  return (
    <Layout>
      <Container>
        <section className="searchCarsSearch mb-4">
          <h1 className="fs-4 fw-bold">Пошук авто</h1>
        </section>
      </Container>
    </Layout>
  );
};
