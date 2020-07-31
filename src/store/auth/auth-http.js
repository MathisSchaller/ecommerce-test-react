import axios from 'axios';

const apiKey = '?key=AIzaSyBR7t_MbltlgPofivDmJyxYkoQhdj6c7E8';

const login = (email, password) => {
  return axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword' +
      apiKey,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
};

const signup = (email, password) => {
  return axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp' +
      apiKey,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
};

const refresh = (refreshToken) => {
  return axios.post(
    'https://securetoken.googleapis.com/v1/token' + apiKey,
    {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }
  );
};

export { login, signup, refresh };
