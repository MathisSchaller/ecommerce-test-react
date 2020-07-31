import React from 'react';
import './Auth.css';

import Spinner from '../../components/UI/Spinner/Spinner';
import Form from '../../components/UI/Form/Form';
import formInputs from './FormsData/Login';

import { connect } from 'react-redux';
import { login, logout } from '../../store/auth2/actions';

const Auth = (props) => {
  const auth = props.auth;
  const login = props.login;
  const logout = props.logout;

  console.log(('AUTH', auth));

  const submitLogIn = (values) => {
    const email = values['email'];
    const password = values['password'];

    login(email, password)
      .then(() => {
        props.history.push('/');
      })
      .catch(() => {});
  };

  return (
    <>
      <h2>Connexion</h2>

      {auth.isProcessing ? <Spinner noText /> : null}
      <p>{auth.error}</p>

      {auth.isAuth ? (
        <>
          <h3>Vous êtes déjà connecté.</h3>
          <button onClick={logout}>Se déconnecter</button>
        </>
      ) : (
        <Form
          inputs={formInputs}
          callback={submitLogIn}
          buttonLabel='Se connecter'
        />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
  logout: () => dispatch(logout()),
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
