import React from 'react';
import './Header.css';

import logo from '../../assets/logo.svg';
import ArticlesList from '../ArticlesListe/ArticlesListe';

import { NavLink } from 'react-router-dom';
const header = (props) => {
  const { cart, removeHandler } = props;

  let totalPrice = 0.0;

  if (cart.length > 0) {
    totalPrice = cart.reduce((total, article) => total + article.price, 0);
    totalPrice = Math.round(totalPrice * 100) / 100;
  }

  return (
    <div id='header'>
      <h1>Site de vente en ligne</h1>
      <ul>
        <li>
          <NavLink
            exact
            to='/'
            activeStyle={{
              color: 'red',
              fontWeight: 'bold',
            }}>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to='/vente'
            activeStyle={{
              color: 'red',
              fontWeight: 'bold',
            }}>
            Tous les articles
          </NavLink>
        </li>
      </ul>
      <div id='cart'>
        Votre panier : EUR {totalPrice}
        <div id='cart-list'>
          <ArticlesList articles={cart} removeHandler={removeHandler} />
        </div>
      </div>
      <img src={logo} className='App-logo' alt='logo' />
    </div>
  );
};

export default header;
