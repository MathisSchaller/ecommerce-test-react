import React, { useState, useEffect } from 'react';
import './FullArticle.css';

import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';
import { getArticleById } from '../../store/articles/actions';
import { addCart } from '../../store/cart/actions';

const FullArticle = (props) => {
  const [article, setArticle] = useState({
    title: props.location.search.slice(1),
  });

  const articleId = props.match.params.id;

  useEffect(() => {
    getArticleById(articleId)
      .then((res) => {
        const article = res.data;
        article.id = articleId;
        setArticle(res.data);
      })
      .catch(() => props.history.push({ pathname: '/404' }));
  }, [articleId, props.history]);

  return (
    <div>
      <h3>{article.title}</h3>
      {article.desc ? (
        <div>
          <p>{article.desc}</p>
          <p>EUR {article.price}</p>
          <div
            style={{
              color: 'lightgreen',
              cursor: 'pointer',
              border: '2px solid lightgreen',
              borderRadius: '5px',
              padding: '8px',
              marginBottom: '2em',
            }}
            onClick={() => props.addToCart(article)}>
            Ajouter au panier
          </div>
        </div>
      ) : (
        <Spinner noText={false} /> // Facultatif, comportement par défaut
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getArticleById: (id) => dispatch(getArticleById(id)),
  addToCart: (article) => dispatch(addCart(article)),
});

export default connect(null, mapDispatchToProps)(FullArticle);
