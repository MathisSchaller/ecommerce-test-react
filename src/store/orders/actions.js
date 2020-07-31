import * as actions from '../actionsEnum';
import axios from 'axios';
import { clearCart } from '../cart/actions';

const apiUrl = 'https://bd-test-hooks.firebaseio.com/orders';

export const getOrders = () => {
  return (dispatch, getState) => {
    const token = getState().auth.user.token;
    const userId = getState().auth.user.userId;

    return axios
      .get(`${apiUrl}/${userId}.json?auth=${token}`)
      .then((res) => {
        const orders = res.data;

        let updatedOrders = [];
        for (const id in orders) {
          updatedOrders.push({
            ...orders[id],
            id: id,
          });
        }

        dispatch(setOrders(updatedOrders));
      })
      .catch((err) => {
        dispatch(clearOrders());
        if (err.response) throw err.response.data.error;
        else throw err;
      });
  };
};

export const newOrder = () => {
  return (dispatch, getState) => {
    const state = getState();

    let totalPrice = state.cart.reduce(
      (total, article) => total + article.price,
      0
    );
    totalPrice = Math.round(totalPrice * 100) / 100;

    const preparedOrder = {
      date: new Date(),
      articles: state.cart,
      totalPrice: totalPrice,
      fees: 0,
      discount: 0,
    };

    const token = state.auth.user.token;
    const userId = state.auth.user.userId;

    axios
      .post(
        `${apiUrl}/${userId}.json?auth=${token}`,
        preparedOrder
      )
      .then((res) => {
        preparedOrder.id = res.data.name;
        dispatch(addOrder(preparedOrder));
        dispatch(clearCart());
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response);
      });
  };
};

const setOrders = (orders) => ({
  type: actions.GET_ORDERS,
  payload: orders,
});

const addOrder = (order) => ({
  type: actions.ADD_ORDER,
  payload: order,
});

const clearOrders = () => ({
  type: actions.CLEAR_ORDERS,
});
