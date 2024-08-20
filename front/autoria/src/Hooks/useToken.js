import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
  const [token, setToken] = useState(getToken());
  const saveToken = (userToken) => {
    sessionStorage.setItem(
      'token',
      JSON.stringify({ token: userToken.token, refreshToken: userToken.refreshToken })
    );
    setToken(userToken.token);
  };
  return {
    setToken: saveToken,
    token
  };
}
