import React from 'react';
import './Order.css';

import ArticlesListe from '../../ArticlesListe/ArticlesListe';

const Order = ({ order }) => {
  const {
    id,
    date,
    discount,
    totalPrice,
    articles,
    fees,
  } = order;

  return (
    <div>
      <h3>Commande {id}</h3>
      <p>
        Passée le {new Date(date).toLocaleDateString()}
        {' à ' + new Date(date).toLocaleTimeString()}
      </p>
      <p>
        Rabais: {discount} | Frais: {fees}
      </p>
      <h4>Total: {totalPrice}</h4>
      <div>
        <h5>Articles concernés</h5>
        <ArticlesListe articles={articles} />
      </div>
    </div>
  );
};

export default Order;
