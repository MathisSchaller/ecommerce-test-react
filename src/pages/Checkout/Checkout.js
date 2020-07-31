import React from 'react';
import './Checkout.css';

import { connect } from 'react-redux';
import { newOrder } from '../../store/orders/actions';

const Checkout = ({ cart, addOrder }) => {
  const isCartEmpty = !cart || cart.length <= 0;

  return isCartEmpty ? (
    <>
      <p>Ajoutez quelques articles à votre panier... :)</p>
      <button disabled style={{ backgroundColor: '#777' }}>
        ACHETER !
      </button>
    </>
  ) : (
    <button onClick={() => addOrder(cart)}>ACHETER !</button>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addOrder: () => dispatch(newOrder()),
});

const mapStateToProps = (state) => ({ cart: state.cart });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
