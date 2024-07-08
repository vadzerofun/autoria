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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
