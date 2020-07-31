import React from 'react';
import './NewAccount.css';

import Spinner from '../../components/UI/Spinner/Spinner';
import Form from '../../components/UI/Form/Form';
import formInputs from './FormsData/Signup';

import { connect } from 'react-redux';
import { signUp } from '../../store/auth2/actions';

const Auth = (props) => {
  const auth = props.auth;
  const signUp = props.signUp;

  const submitNewAccount = (values) => {
    const email = values['email'];
    const password = values['password'];
    const confirmPassword = values['confirm_password'];

    if (password !== confirmPassword)
      alert('Mots de passes différents');
    else
      signUp(email, password)
        .then(() => {
          props.history.push('/');
        })
        .catch(() => {});
  };

  return (
    <>
      <h2>Créer un compte</h2>

      {auth.isProcessing ? <Spinner noText /> : null}
      <p>{auth.error}</p>

      {auth.isAuth ? (
        <h3>Vous êtes déjà connecté.</h3>
      ) : (
        <Form
          inputs={formInputs}
          callback={submitNewAccount}
          buttonLabel='Créer un compte'
        />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUp: (email, password) => dispatch(signUp(email, password)),
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
