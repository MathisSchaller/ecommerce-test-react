import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import ArticlesList from '../ArticlesListe/ArticlesListe';

import { connect } from 'react-redux';
import { removeCart, loadCart } from '../../store/cart/actions';

const Header = ({ isAuth, cart, removeCart, loadCart }) => {
  const payButtonink = isAuth ? '/panier' : '/auth';

  let totalPrice = 0.0;

  if (!cart) cart = [];

  if (cart.length > 0) {
    totalPrice = cart.reduce((total, article) => {
      return total + article.price;
    }, 0);
    totalPrice = Math.round(totalPrice * 100) / 100;
  }

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <div id='header'>
      <h1>Site de vente en ligne</h1>
      <ul>
        <li>
          <NavLink exact to='/'>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/vente'>
            Tous les articles
          </NavLink>
        </li>
        {isAuth ? (
          <>
            <li>
              <NavLink exact to='/commandes'>
                Mes commandes
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/article/nouveau'>
                Ajouter un article
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/account'>
                Mon compte
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink exact to='/auth'>
                Connexion
              </NavLink>
            </li>
            <li>
              <NavLink exact to='/signup'>
                Créer un compte
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <div id='cart'>
        Votre panier:
        <Link to={payButtonink}>
          <button>EUR {totalPrice}</button>
        </Link>
        <div id='cart-list'>
          {!cart || cart.length <= 0 ? (
            <p>Votre panier est vide.</p>
          ) : (
            <ArticlesList
              articles={cart}
              removeHandler={removeCart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeCart: (id) => dispatch(removeCart(id)),
  loadCart: () => dispatch(loadCart()),
});

const mapStateToProps = (state) => ({
  cart: state.cart,
  isAuth: state.auth.isAuth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
