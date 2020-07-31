import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

const AuthRoute = (props) => {
  // Auth
  const isAuth = props.auth.isAuth;
  const isLoading = props.auth.isProcessing;

  React.log('isProcessing:', isLoading);
  React.log('isAuth:', isAuth);

  let core = <p>default</p>;

  if (isLoading) {
    core = (
      <Route
        exact={props.exact}
        path={props.path}
        render={() => <p>Please wait while we load your data</p>}
      />
    );
    React.log('CORE', core);
  } else if (isAuth) {
    core = <Route {...props} />;
  } else {
    React.log('WILL REDIRECT');
    core = <Redirect to='/auth' />;
  }

  return core;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AuthRoute);
