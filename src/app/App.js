import React, { useEffect } from 'react';
import './App.css';
import Header from '../components/Header/Header';
import Router from '../pages/Router';

import { connect } from 'react-redux';
import { checkTokenValidity } from '../store/auth2/actions';

const App = (props) => {
  // Auth
  const checkTokenValidity = props.checkTokenValidity;

  // Before render
  useEffect(() => {
    checkTokenValidity();
  }, [checkTokenValidity]);

  return (
    <div className='App'>
      <header className='App-header'>
        <Router>
          <Header />
        </Router>
      </header>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkTokenValidity: () => dispatch(checkTokenValidity()),
});

export default connect(null, mapDispatchToProps)(App);
