import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { logout } from '../../store/auth2/actions';

const Logout = (props) => {
  const logout = props.logout;

  useEffect(() => {
    logout();
    const timer = setTimeout(() => {
      props.history.push('/');
    }, 3000);
    return () => {
      clearTimeout(timer);
      logout();
    };
  }, [logout, props.history]);

  return (
    <>
      <h2>Vous avez été déconnecté.</h2>
      <p>Vous allez être redirigé vers l'accueil...</p>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
