import React, { Suspense } from 'react';
import './Spinner.css';

import logo from '../../../assets/logo.svg';

const Spinner = ({ noText }) => (
  <Suspense fallback={<div>loading...</div>}>
    <p className='Spinner'>
      <img src={logo} className='App-logo' alt='logo' />
      {!noText ? 'Chargement...' : null}
    </p>
  </Suspense>
);

export default Spinner;
