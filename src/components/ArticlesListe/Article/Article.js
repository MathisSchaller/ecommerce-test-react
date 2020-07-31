import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Article = ({ article, addClick, removeClick, userId }) => (
  <div className='article'>
    <Link
      to={{
        pathname: '/article/' + article.id,
        search: article.title,
      }}>
      <h3>{article.title}</h3>
      <p>{article.desc}</p>
    </Link>
    {addClick ? (
      <button onClick={addClick}>EUR {article.price}</button>
    ) : (
      <p>EUR {article.price}</p>
    )}
    {removeClick && article.userId === userId ? (
      <button
        style={{ backgroundColor: 'red' }}
        onClick={removeClick}>
        X
      </button>
    ) : null}
    <hr style={{ marginBottom: 0 }} />
  </div>
);

const mapStateToProps = (state) => ({
  userId: state.auth.user.userId,
});

export default connect(mapStateToProps)(Article);
