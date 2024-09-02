import React, { useState } from 'react';
import axios from 'axios';
import { Layout } from '../../Components/Layouts/Layout/Layout';
import useToken from '../../Hooks/useToken';
import { LoginRegister } from '../../Components/Auth/LoginRegister/LoginRegister';
import './AddCar.css';
import { AddCarForm } from '../../Components/CarForm/AddCarForm/AddCarForm';

export const AddCar = () => {
  // token
  const { token, setToken } = useToken();

  if (!token) {
    return <LoginRegister />;
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
