import React from 'react';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import { Container } from 'react-bootstrap';
import './News.css';

export const News = () => {
  return (
    <Layout>
      <Container>
        <section className="newsTitle">
          <h1 className="fs-2 fw-bold">Автоновини</h1>
        </section>
      </Container>
    </Layout>
  );
};