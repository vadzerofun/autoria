import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page.jsx';
import { Register } from './Components/Auth/Register/Register.jsx';
import { Login } from './Components/Auth/Login/Login.jsx';
import { LoginRegister } from './Components/Auth/LoginRegister/LoginRegister.jsx';
import { ForgotPassword } from './Components/Auth/ForgotPassword/ForgotPassword.jsx';
import { Home } from './Pages/Home/Home.jsx';
import { ConfirmEmail } from './Components/Auth/ConfirmEmail/ConfirmEmail.jsx';
import { Car } from './Pages/Car/Car.jsx';
import { Cabinet } from './Pages/Cabinet/Cabinet.jsx';
import { AddCar } from './Pages/AddCar/AddCar.jsx';
import { EditCabinet } from './Pages/Cabinet/EditCabinet/EditCabinet.jsx';
import { CabinetLayout } from './Components/Layouts/CabinetLayout/CabinetLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: (
      <div>
        <Login />
      </div>
    )
  },
  {
    path: '/register',
    element: (
      <div>
        <Register />
      </div>
    )
  },
  {
    path: '/login-register',
    element: (
      <div>
        <LoginRegister />
      </div>
    )
  },
  {
    path: '/forgot-password',    
    element: (
      <div>
        <ForgotPassword />
      </div>
    )
  },
  {
    path: '/forgot-password/:token',    
    element: (
      <div>
        <ForgotPassword />
      </div>
    )
  },
  {
    path: '/confirm-email',
    element: (
      <div>
        <ConfirmEmail />
      </div>
    )
  },
  {
    path: '/cars/:carId',
    element: (
      <div>
        <Car />
      </div>
    )
  },
  {
    path: '/cabinet',
    element: (
      <div>
        <Cabinet />
      </div>
    ),    
  },
  {
    path: '/cabinet/edit',
    element: (
      <div>
        <EditCabinet />
      </div>
    ),    
  },
  {
    path: '/add-car',
    element: (
      <div>
        <AddCar />
      </div>
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
