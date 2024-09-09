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
import { LoginRegister } from '../../../Components/Auth/LoginRegister/LoginRegister';
import { UserIcon } from '../../../Components/Icons/UserIcon/UserIcon';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken, refreshAuthToken } from '../../../Services/authService';

export const EditCabinet = () => {
  const { token } = useToken();
  const userId = getUserIdFromToken(token);
  const { user, loading, error } = useUser(userId);

  // imagesURL
  const imagesURL = import.meta.env.VITE_IMAGES_URL;
  const [selectedFileURL, setSelectedFileURL] = useState(null);
  // useNavigate
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    EditId: '',
    Name: '',
    Phone: '',
    Email: '',
    Password: '',
    Region: '',
    IsEmailConfirmed: false,
    userRole: '',
    FormImageFile: ''
  });
  console.log(formData);

  useEffect(() => {
    if (user) {
      const fetchedFormData = {
        EditId: user.id,
        Name: user.name,
        Phone: user.phone.replace('+38', ''),
        Email: user.email,
        Password: user.password,
        Region: user.region,
        IsEmailConfirmed: user.isEmailConfirmed,
        userRole: user.userRole,
        FormImageFile: ''
      };

      setFormData({ ...fetchedFormData });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });

    // set image after file selected
    if (files) setSelectedFileURL(URL.createObjectURL(files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('EditId', formData.EditId);
    formDataToSend.append('Name', formData.Name);
    formDataToSend.append('Phone', '+38' + formData.Phone);
    formDataToSend.append('Email', formData.Email);
    formDataToSend.append('Password', formData.Password);
    formDataToSend.append('Region', formData.Region);
    formDataToSend.append('IsEmailConfirmed', formData.IsEmailConfirmed);
    formDataToSend.append('userRole', formData.userRole);
    if (formData.FormImageFile) {
      formDataToSend.append('FormImageFile', formData.FormImageFile);
    }

    editUser(formDataToSend).catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        refreshAuthToken(token, setToken).then(() => {
          editUser(formDataToSend);
        });
      }
    });
  };

  // editUser
  const editUser = (formDataToSend) => {
    return axios
      .post(import.meta.env.VITE_REACT_API_URL + 'User/EditUser', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token.token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        window.location = window.location;
      });
  };

  if (!token) {
    return <CabinetLayout></CabinetLayout>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(selectedFileURL);

  return (
    <CabinetLayout>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8">
            <h1 className="fs-3 text-center mb-4">Моя анкета</h1>
            <Form onSubmit={handleSubmit}>
              {((user.imageLink || selectedFileURL) && (
                <img
                  src={selectedFileURL ? selectedFileURL : imagesURL + user.imageLink}
                  alt="User Photo"
                  height={80}
                  width={80}
                  className="object-fit-cover border border-solid border-secondary rounded-circle mb-3"
                />
              )) || (
                <div className="mb-3">
                  <UserIcon color="#5C5C5C" size={80} />
                </div>
              )}
              <Form.Group controlId="formImageFile" className="mb-3">
                <Form.Label>Завантажити зображення</Form.Label>
                <Form.Control
                  type="file"
                  name="FormImageFile"
                  onChange={handleChange}
                  accept="image/png, image/jpeg"
                />
              </Form.Group>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Ім'я</Form.Label>
                <Form.Control
                  type="text"
                  name="Name"
                  value={formData.Name}
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
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                    placeholder="Введіть телефон"
                  />
                </div>
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="Введіть email"
                />
              </Form.Group>
              <Form.Group controlId="region" className="mb-3">
                <Form.Label>Регіон</Form.Label>
                <Form.Control
                  type="text"
                  name="Region"
                  value={formData.Region}
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
