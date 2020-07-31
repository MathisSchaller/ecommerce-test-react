import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AuthRoute from './AuthRoute';

// Lazy loading des pages
const notFnd = lazy(() => import('./404/404'));
const Logout = lazy(() => import('./Auth/Logout'));
const Authen = lazy(() => import('./Auth/Auth'));
const Chkout = lazy(() => import('./Checkout/Checkout'));
const Orders = lazy(() => import('./Commandes/Commandes'));
const HomePg = lazy(() => import('./Home/Home'));
const NewArt = lazy(() => import('./NewArticle/NewArticle'));
const AllArt = lazy(() => import('./Vente/Vente'));
const FulArt = lazy(() => import('./FullArticle/FullArticle'));
const MyAcnt = lazy(() => import('./Auth/Account'));
const NewAcc = lazy(() => import('./Auth/NewAccount'));

const Router = (props) => {
  return (
    <BrowserRouter>
      {props.children}
      <Suspense fallback={<h2>loading routes...</h2>}>
        <Switch>
          <AuthRoute exact path='/account' component={MyAcnt} />
          <AuthRoute exact path='/panier' component={Chkout} />
          <AuthRoute
            exact
            path='/commandes'
            component={Orders}
          />
          <AuthRoute
            exact
            path='/article/nouveau'
            component={NewArt}
          />

          <Route exact path='/signup' component={NewAcc} />
          <Route exact path='/auth' component={Authen} />

          <Route exact path='/' component={HomePg} />
          <Route exact path='/404' component={notFnd} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/vente' component={AllArt} />
          <Route exact path='/article/:id' component={FulArt} />

          <Redirect exact from='/article' to='/vente' />
          <Redirect exact from='/articles' to='/vente' />

          <Redirect to='/404' />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
