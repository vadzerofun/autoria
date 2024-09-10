// authService.js

import axios from 'axios';

// refreshAuthToken
export const refreshAuthToken = (token, setToken) => { 
  return axios.post(
    import.meta.env.VITE_REACT_API_URL + 'User/refresh-token',
    {
      "refreshToken": token.refreshToken
    }
  )
  .then(response => {
    // Set token
    const tokenValue = response.data.value;                                
    setToken(tokenValue);
  })
  .catch(err => {
    console.log(err);
  });
};

// getUserIdFromToken
export const getUserIdFromToken = (token) => {
  if (!token || !token.token) return null;
  const tokenValue = token.token;  
  const arrayToken = tokenValue.split('.');
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  return tokenPayload.sub;
};
