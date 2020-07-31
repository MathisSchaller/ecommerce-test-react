import * as actions from '../actionsEnum';
import { getArticleById } from '../articles/actions';

export const loadCart = () => {
  return (dispatch) => {
    let cart = localStorage.getItem('cart');
    cart = stringToArray(cart);

    loadCartArticles(cart).then((articles) =>
      dispatch(load(articles))
    );
  };
};
export const addCart = (article) => {
  return (dispatch) => {
    let cart = localStorage.getItem('cart');
    cart = stringToArray(cart);

    cart.push(article.id);
    localStorage.setItem('cart', arrayToString(cart));

    dispatch(add(article));
  };
};
export const removeCart = (id) => {
  return (dispatch) => {
    let cart = localStorage.getItem('cart');
    cart = stringToArray(cart);

    cart = cart.filter((articleId) => articleId !== id);
    localStorage.setItem('cart', arrayToString(cart));

    dispatch(remove(id));
  };
};
export const clearCart = () => {
  return (dispatch) => {
    localStorage.removeItem('cart');

    dispatch(clear());
  };
};

// call addOrder then clearCart
export const payCart = () => {
  clear();
};

const add = (article) => {
  return {
    type: actions.ADD_CART,
    payload: article,
  };
};
const remove = (id) => {
  return {
    type: actions.REMOVE_CART,
    payload: id,
  };
};
const load = (articles) => {
  return {
    type: actions.LOAD_CART,
    payload: articles,
  };
};
const clear = (article) => {
  return {
    type: actions.CLEAR_CART,
  };
};

// Utilitaire
const separator = ',';
const arrayToString = (array) => {
  return array.join(separator);
};
const stringToArray = (string) => {
  if (!string) return [];
  return string.split(separator);
};

async function loadCartArticles(cart) {
  let newCart = [];
  for (const index in cart) {
    await getArticleById(cart[index]).then((res) => {
      const article = res.data;
      article.id = cart[index];
      newCart.push(article);
    });
  }

  return new Promise((resolve) => {
    resolve(newCart);
  });
}
