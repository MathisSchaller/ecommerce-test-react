import React, { useState } from 'react';
import * as query from './auth-http';

const AuthContext = React.createContext({
  user: {
    token: null,
    userId: null,
    error: null,
  },
  isProcessing: false,
  isAuth: false,
  signUp: () => {},
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState({
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    error: null,
  });

  function signUp(email, password) {
    setIsProcessing(true);
    return query
      .signup(email, password)
      .then(() => {
        setUser({
          ...user,
          error: null,
        });
      })
      .catch((err) => {
        const errMsg = err.response.data.error.message;
        setUser({
          ...user,
          error: errMsg,
        });
        throw errMsg;
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  function login(email, password) {
    setIsProcessing(true);
    return query
      .login(email, password)
      .then((res) => {
        loginSuccess(res.data);
      })
      .catch((err) => {
        const errMsg = err.response.data.error.message;
        setUser({
          ...user,
          error: errMsg,
        });
        throw errMsg;
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  function loginSuccess({
    expiresIn,
    idToken,
    localId,
    refreshToken,
  }) {
    localStorage.setItem('token', idToken);
    localStorage.setItem('userId', localId);
    localStorage.setItem(
      'expirationDate',
      new Date(new Date().getTime() + expiresIn * 1000)
    );
    localStorage.setItem('refreshToken', refreshToken);
    setUser({
      ...user,
      token: idToken,
      userId: localId,
      error: null,
    });
    checkAuthTimeout(expiresIn);
  }

  function logout() {
    setIsProcessing(true);

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('refreshToken');
    setUser({ token: null, userId: null, error: null });

    setIsProcessing(false);
  }

  function checkTokenValidity() {
    setIsProcessing(true);

    const token = localStorage.getItem('token');
    const exprationDate = new Date(
      localStorage.getItem('expirationDate')
    );
    if (!token || exprationDate < new Date())
      //return logout();
      return new Promise((resolve) => resolve()).then(() => {
        logout();
      });

    const refrshTkn = localStorage.getItem('refreshToken');
    return refreshToken(refrshTkn)
      .then((res) => {
        const {
          expires_in,
          id_token,
          refresh_token,
          user_id,
        } = res;

        loginSuccess({
          expiresIn: expires_in,
          idToken: id_token,
          localId: user_id,
          refreshToken: refresh_token,
        });

        setIsProcessing(false);
      })
      .catch((err) => {
        logout();
      });
  }

  function refreshToken(refreshToken) {
    return query
      .refresh(refreshToken)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        const errMsg = err.response.data.error.message;
        React.log(errMsg);
        setUser({
          ...user,
          error: errMsg,
        });
        throw errMsg;
      });
  }

  function checkAuthTimeout(expiresIn) {
    setTimeout(checkTokenValidity, expiresIn * 1000);
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isProcessing: isProcessing,
        isAuth: !!user.token,
        signUp: signUp,
        login: login,
        logout: logout,
        checkTokenValidity: checkTokenValidity,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContextProvider;
