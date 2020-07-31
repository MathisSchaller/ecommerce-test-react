import React from 'react';
import './OrdersList.css';

import Order from './Order/Order';

const OrdersList = ({ orders }) => {
  React.log(orders);
  let render = <p>Pas de commande à afficher.</p>;
  if (orders && orders.length > 0)
    render = orders.map((order) => (
      <Order key={order.id} order={order} />
    ));

  return render;
};

export default OrdersList;
