// authService.js

import axios from 'axios';

// refreshAuthToken
export const refreshAuthToken = (token) => {
  return axios.post(
    import.meta.env.VITE_REACT_API_URL + 'User/refresh-token',
    {
      "refreshToken": token.refreshToken
    }
  )
  .then(response => {
    return response.data.value; 
  })
  .catch(err => {
    console.error('Error refreshing token:', err);
    navigate('/login-register');
  });
};

// getUserIdFromToken
export const getUserIdFromToken = (token) => {
  if (!token) return null;
  const tokenValue = token.token;  
  const arrayToken = tokenValue.split('.');
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  return tokenPayload.sub;
};
