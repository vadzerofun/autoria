import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import useToken from '../../Hooks/useToken';
import './AddCar.css';
import { AddCarForm } from '../../Components/CarForm/AddCarForm/AddCarForm';
import { AuthOffcanvas } from '../../Components/Auth/AuthOffcanvas/AuthOffcanvas';

export const AddCar = () => {
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

  // formData
  const [formData, setFormData] = useState({
    Type: 0, // тип авто
    Body: '', // кузов
    Make: '',
    Model: '',
    Year: 0,
    Mileage: 0, // пробіг
    Price: 0,
    Сurrency: 0,
    Engine_type: 0,
    Engine_capacity: 0,
    Occasion: 0,
    Transmission_type: 0,
    Carrying_capacity_ton: 0,
    State: 0,
    Color: '',
    Number_of_seats: 1,
    Road_accident: '',
    Owners_number: 0,
    Wanted: false,
    Car_number: '',
    Car_vin_code: '',
    Region: '',
    City: '',
    Description: '',
    // Seller
    SellerPhone: '',
    SellerName: '',
    SellerPhoneExtra: '',
    ImageFiles: []
  });  

  return (
    <Layout>
      <AddCarForm carData={{...formData}} />      
    </Layout>
  );
};
