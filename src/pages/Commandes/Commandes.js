import React, { useState, useEffect } from 'react';
import './Commandes.css';

import { connect } from 'react-redux';
import { getOrders } from '../../store/orders/actions';

import Spinner from '../../components/UI/Spinner/Spinner';
import OrdersList from '../../components/OrdersList/OrdersList';

const Commandes = ({ orders, getOrders }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getOrders()
      .then(() => {
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getOrders]);

  return (
    <>
      <h2>Vos commandes</h2>
      {isLoading ? <Spinner /> : <OrdersList orders={orders} />}
      {error}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getOrders: () => dispatch(getOrders()),
});

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Commandes);
