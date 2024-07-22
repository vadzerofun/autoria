import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Root from "./routes/root";
import ErrorPage from './error-page.jsx';
import { Register } from './Components/Register/Register.jsx';
import { Login } from './Components/Login/Login.jsx';
import LoginRegister from './Components/LoginRegister/LoginRegister.jsx';
import { ForgotPassword } from './Components/ForgotPassword/ForgotPassword.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <div><Login /></div>,
  },
  {
    path: "/register",
    element: <div><Register /></div>,
  },
  {
    path: "/login-register",
    element: <div><LoginRegister /></div>,
  },
  {
    path: "/forgot-password",
    element: <div><ForgotPassword /></div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
