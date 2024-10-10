import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import useToken from '../../Hooks/useToken';

// stripePromise
const stripePromise = loadStripe(
  'pk_test_51Pmd8NP6QMwmaue2i1qaSXzN3M72yW6qLH82c0ZRnEtg3mTFfQ4Xt9krGGbz5OysnR6DusRXEV05rio6jfq8E82z00496mbkyt'
);

export const PaymentForm = ({course}) => {
  // token
  const { token } = useToken();
  // amount
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // get URL
  const baseUrl = `${window.location.protocol}//${window.location.host}/`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const parsedAmount = Math.round(parseFloat(amount) * 100);

    // const parsedAmount = parseInt(amount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Invalid amount entered.');
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_REACT_API_URL + 'Pay',
        {
          price: parsedAmount,
          sucsessLink: baseUrl + 'cabinet/balance/?success=true',
          badLink: baseUrl + 'cabinet/balance/?success=false',
          course: course,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const { sessionId } = response.data;
      if (sessionId) {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage('No sessionId returned from server.');
      }
    } catch (error) {
      console.log(error);
      // setErrorMessage(`Error: ${error.response?.data || error.message}`);
    }
  };

  // валідація суми
  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Дозволити лише цифри і один розділювач (кома або крапка)
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div>
      <h1 className="fs-3 text-center mb-4">Поповнити баланс</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="amount" className="mb-3">
          <Form.Label className="fw-medium">Сума ($):</Form.Label>
          <Form.Control type="text" value={amount} onChange={handleAmountChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Оплатити
        </Button>
      </Form>
    </div>
  );
};
