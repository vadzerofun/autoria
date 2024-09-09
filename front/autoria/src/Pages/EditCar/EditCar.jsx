import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import useToken from '../../Hooks/useToken';
import { LoginRegister } from '../../Components/Auth/LoginRegister/LoginRegister';
import { useParams } from 'react-router-dom';
import useGetCarById from '../../Hooks/useLoadCarPage';
import { capitalizeObjectKeys } from '../../Services/formatService';
import { EditCarForm } from '../../Components/CarForm/EditCarForm/EditCarForm';
import { AuthOffcanvas } from '../../Components/Auth/AuthOffcanvas/AuthOffcanvas';

export const EditCar = () => {
  // showOffcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  // imagesURL
  const imagesURL = import.meta.env.VITE_IMAGES_URL;
  // token
  const { token, setToken } = useToken();

  // useParams, carId
  const params = useParams();
  const carId = params.carId;

  // fetch car
  const { car, loading, error } = useGetCarById(carId);

  // formData
  const formData = { 
    ...car,
    ImageFiles: [], 
  };
  
  const formDataFormatted = capitalizeObjectKeys(formData);

  console.log(formDataFormatted);
  
  
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <EditCarForm carData={{...formDataFormatted}} token={token}/>
    </Layout>
  );
};

