import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CabinetLayout } from '../../../Components/Layouts/CabinetLayout/CabinetLayout';
import './EditCabinet.css';
import useToken from '../../../Hooks/useToken';
import useUser from '../../../Hooks/useUser';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Login } from '../../../Components/Auth/Login/Login';

export const EditCabinet = () => {
  const { token } = useToken();
  const userId = getUserIdFromToken(token);
  const { user, loading, error } = useUser(userId);

  const [formData, setFormData] = useState({
    image: '',
    ...user,
    imageLink: 'string'
  });

  useEffect(() => {
    if (user) {
      user.phone = user.phone.replace('+38', '');

      setFormData({
        image: '',
        ...user,
        imageLink: 'string'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.phone = '+38' + formData.phone;

    const formDataCapitalized = capitalizeObjectProperties(formData);
    console.log(formDataCapitalized);    

    axios
      .post(import.meta.env.VITE_REACT_API_URL + 'User/EditUser', formDataCapitalized, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!token) {
    return <Login />;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <CabinetLayout>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8">
            <h1 className="fs-3 text-center mb-4">Моя анкета</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="image" className="mb-3">
                <Form.Label>Завантажити зображення</Form.Label>
                <Form.Control type="file" name="image" onChange={handleChange} accept="image/*" />
              </Form.Group>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Ім'я</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Введіть ім'я"
                />
              </Form.Group>
              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Телефон</Form.Label>
                <div className="d-flex gap-3 align-items-center">
                  +38
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Введіть телефон"
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Введіть email"
                />
              </Form.Group>
              <Form.Group controlId="region" className="mb-3">
                <Form.Label>Регіон</Form.Label>
                <Form.Control
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  placeholder="Введіть регіон"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Зберегти
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </CabinetLayout>
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

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const capitalizeObjectProperties = (obj) => {
  const capitalizedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const capitalizedKey = capitalizeFirstLetter(key);
      capitalizedObj[capitalizedKey] = obj[key];
    }
  }
  return capitalizedObj;
};
