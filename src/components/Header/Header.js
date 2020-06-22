import React from 'react';
import './Header.css';

import ArticlesList from '../ArticlesListe/ArticlesListe';

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
      <div id='cart'>
        Votre panier : EUR {totalPrice}
        <div id='cart-list'>
          <ArticlesList articles={cart} removeHandler={removeHandler} />
        </div>
      </div>
    </div>
  );
};

export default header;
