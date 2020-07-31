import { combineReducers } from 'redux';

import authReducer from './auth2/reducer';
import articlesReducer from './articles/reducer';
import cartReducer from './cart/reducer';
import ordersReducer from './orders/reducer';

const mainReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export default mainReducer;
