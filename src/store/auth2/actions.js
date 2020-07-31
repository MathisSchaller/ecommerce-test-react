import * as actions from '../actionsEnum';
import axios from 'axios';
import * as query from '../auth/auth-http';

const apiUrl = 'https://bd-test-hooks.firebaseio.com/users';

export const signUp = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());

    return query
      .signup(email, password)
      .then((res) => {
        const userInfos = {
          userId: res.data.localId,
          token: res.data.idToken,
          infos: { email: email },
        };
        addUser(userInfos)
          .then((res) => {
            console.log('= ADD USER =');
            console.log(res);
            // dispatch(add(article));
          })
          .catch((err) => {
            console.log('= ADD USER =');
            console.log(err);
            console.log(err.response);
          });

        const {
          expiresIn,
          idToken,
          localId,
          refreshToken,
        } = res.data;

        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );

        localStorage.setItem('token', idToken);
        localStorage.setItem('userId', localId);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('refreshToken', refreshToken);

        checkAuthTimeout(expiresIn);

        dispatch(authSuccess(idToken, localId, refreshToken));
      })
      .catch((err) => {
        const errMsg = err.response.data.error.message;
        dispatch(authFail(errMsg));
        throw errMsg;
      });
  };
};

const addUser = (user) => {
  return axios.put(
    `${apiUrl}/${user.userId}.json?auth=${user.token}`,
    user.infos
  );
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());

    return query
      .login(email, password)
      .then((res) => {
        const {
          expiresIn,
          idToken,
          localId,
          refreshToken,
        } = res.data;

        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );

        localStorage.setItem('token', idToken);
        localStorage.setItem('userId', localId);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('refreshToken', refreshToken);

        checkAuthTimeout(expiresIn);

        getUserInfos(dispatch, localId, idToken);

        dispatch(authSuccess(idToken, localId, refreshToken));
      })
      .catch((err) => {
        const errMsg = err.response.data.error.message;
        dispatch(authFail(errMsg));
        throw errMsg;
      });
  };
};

const checkAuthTimeout = (expiresIn) => {
  setTimeout(checkTokenValidity, expiresIn * 1000);
};

export const checkTokenValidity = () => {
  return (dispatch, getState) => {
    dispatch(authStart());

    // ! token inexistant retourne `null`
    const stateToken = getState().auth.user.token;
    console.log('checkvalidity -> getState token', stateToken);

    const token = localStorage.getItem('token');
    const exprationDate = new Date(
      localStorage.getItem('expirationDate')
    );
    console.log(
      'stored date < now',
      exprationDate,
      exprationDate < new Date()
    );
    // todo: a voir pourquoi promise + refresh que si date expirée
    if (!token || exprationDate < new Date())
      //return logout();
      return new Promise((resolve) => resolve()).then(() => {
        dispatch(logout());
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

        const expirationDate = new Date(
          new Date().getTime() + expires_in * 1000
        );

        localStorage.setItem('token', id_token);
        localStorage.setItem('userId', user_id);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('refreshToken', refresh_token);

        checkAuthTimeout(expires_in);

        getUserInfos(dispatch, user_id, id_token).then(() => {
          dispatch(
            authSuccess(id_token, user_id, refresh_token)
          );
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(logout());
        dispatch(authFail(err));
      });
  };
};

const getUserInfos = (dispatch, userId, token) => {
  return axios
    .get(`${apiUrl}/${userId}.json?auth=${token}`)
    .then((res) => {
      console.log('getUser', res);
      dispatch(updateUser(res.data));
    })
    .catch((err) => {
      console.log('getUser', err.response);
      dispatch(authFail(err.response.error));
    });
};

export const updateUserInfos = (newInfos) => {
  return (dispatch, getState) => {
    // dispatch(authStart());
    const { userId, token } = getState().auth.user;

    // ou axios.patch
    return axios
      .patch(`${apiUrl}/${userId}.json?auth=${token}`, newInfos)
      .then((res) => {
        console.log('updateUser', res);
        dispatch(updateUser(res.data));
      })
      .catch((err) => {
        console.log('updateUser', err.response);
        dispatch(authFail(err.response.error));
      });
  };
};

const refreshToken = (refreshToken) => {
  return query
    .refresh(refreshToken)
    .then((res) => {
      console.log('refreshToken', res);
      return res.data;
    })
    .catch((err) => {
      const errMsg = err.response.data.error.message;
      throw errMsg;
    });
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('refreshToken');

    dispatch(authLogout());
  };
};

// State
const authStart = () => ({
  type: actions.AUTH_START,
});
const authSuccess = (token, userId, refreshToken) => ({
  type: actions.AUTH_SUCCESS,
  payload: {
    token: token,
    userId: userId,
    refreshToken: refreshToken,
  },
});
const authFail = (error) => ({
  type: actions.AUTH_FAIL,
  payload: error,
});
const authLogout = () => ({
  type: actions.AUTH_LOGOUT,
});
const updateUser = (infos) => ({
  type: actions.AUTH_UPDATE_USER,
  payload: infos,
});
