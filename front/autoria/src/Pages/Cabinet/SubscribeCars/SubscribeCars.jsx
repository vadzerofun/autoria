import React, { useState } from 'react';
import axios from 'axios';
import './SubscribeCars.css';
import { CabinetLayout } from '../../../Components/Layouts/CabinetLayout/CabinetLayout';
import { MyCarCard } from '../../../Components/CarCards/MyCarCard/MyCarCard';
import { LoginRegister } from '../../../Components/Auth/LoginRegister/LoginRegister';
import useToken from '../../../Hooks/useToken';
import { getUserIdFromToken } from '../../../Services/authService';
import useLoadSubscriptions from '../../../Hooks/useLoadSubscriptions';
import { Button, Form } from 'react-bootstrap';

export const SubscribeCars = () => {
  // selectedCarId
  const [selectedCarId, setSelectedCarId] = useState(null);

  // rselectedRadio
  const [selectedRadio, setSelectedRadio] = useState('');

  // token, user
  const { token } = useToken();

  if (!token) {
    return <CabinetLayout></CabinetLayout>;
  }

  // userId
  const userId = getUserIdFromToken(token);

  // cars
  const { cars, subscriptions, loading, error } = useLoadSubscriptions(userId);
  // console.log(subscriptions);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSubmit = () => {
    if (!selectedCarId) {
      alert('Будь ласка, виберіть авто, яке бажаєте просувати');
      return;
    }
    if (!selectedRadio) {
      alert('Будь ласка, виберіть підписку');
      return;
    }
    if (!userId) {
      console.log("No userId");      
      return;
    }

    const dataToSend = {
      userId: userId,
      carsId: [
        selectedCarId
      ],
      subscribeId: selectedRadio
    };

    subscribe(dataToSend).catch((err)=>{
      console.log(err);      
    });
  };

  // subscribe
  const subscribe = (dataToSend) => {
    return axios
      .post(import.meta.env.VITE_REACT_API_URL + 'UserSubscribe/BuyUserSubscribe', dataToSend, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        window.location = window.location;
      });
  };

  return (
    <CabinetLayout>
      <section className="d-flex flex-column gap-4 subscriptionsSection">
        <h2 className="fs-3 fw-semibold text-primary">Підписка</h2>
        <h3 className="fs-5 fw-semibold">Виберіть авто, яке бажаєте просувати</h3>
        <div className="subscriptionsCars">
          {cars.map((car, index) => (
            <div
              className={`subscriptionsCarCard ${selectedCarId === car.id && 'selectedCarCard'}`}
              onClick={() => {
                setSelectedCarId(car.id);
              }}
              key={`car-${index}`}>
              <MyCarCard car={car} />
            </div>
          ))}
        </div>
        <h3 className="fs-5 fw-semibold">Виберіть рівень підписки</h3>
        <Form onSubmit={handleSubmit} className="mb-5">
          <div className="subscriptionsLevels mb-3">
            <div className="subscriptionLevel">
              <h4 className="fs-6 fw-semibold mb-3">Підписка 1</h4>
              {subscriptions.map((subscription, index, arr) => (
                <div
                  className={`subscriptionLevelItem d-flex justify-content-between align-items-center ${
                    index < arr.length - 1 && 'mb-2'
                  }`}
                  onClick={() => setSelectedRadio(subscription.id)}
                  key={`subscription-${index}-level_${subscription.subLevel}`}>
                  <div className="d-flex align-items-center">
                    <Form.Check
                      type="radio"
                      id={`subscription-${index}-level_${subscription.subLevel}`}
                      name="subscription"
                      label={subscription.tittle}
                      value={subscription.id}
                      checked={selectedRadio === subscription.id}
                      readOnly
                    />
                  </div>
                  <div className="text-primary">{subscription.price} грн</div>
                </div>
              ))}
            </div>
            <div className="subscriptionLevel">
              <h4 className="fs-6 fw-semibold">Підписка 2</h4>
            </div>
            <div className="subscriptionLevel">
              <h4 className="fs-6 fw-semibold">Підписка 3</h4>
            </div>
          </div>
          <Button className="subscriptionsButton" type="submit">
            Оплатити
          </Button>
        </Form>
      </section>
    </CabinetLayout>
  );
};
