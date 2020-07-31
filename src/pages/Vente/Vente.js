import React, { useEffect } from 'react';
import './Vente.css';

import { connect } from 'react-redux';
import {
  searchArticle,
  deleteArticle,
} from '../../store/articles/actions';
import { addCart } from '../../store/cart/actions';

import ArticlesListe from '../../components/ArticlesListe/ArticlesListe';

const Vente = ({
  articles,
  loadArticles,
  deleteArticle,
  addToCart,
}) => {
  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  return (
    <div>
      <h3>
        Liste des derniers articles
        <hr />
      </h3>
      <ArticlesListe
        articles={articles}
        addHandler={(id) => addToCart(id)}
        removeHandler={(id) => deleteArticle(id)}
      />
      {articles.length === 0 ? (
        <h2>
          Désolé, aucun article ne correspond a votre recherche.
        </h2>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadArticles: () => dispatch(searchArticle()),
  deleteArticle: (id) => dispatch(deleteArticle(id)),
  addToCart: (id) => dispatch(addCart(id)),
});

const mapStateToProps = (state) => ({
  articles: state.articles,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vente);
