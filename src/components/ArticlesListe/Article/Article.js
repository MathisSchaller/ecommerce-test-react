import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Article extends Component {
  render() {
    const { id, titre, description, prix, addClick, removeClick } = this.props;
    return (
      <div className='article'>
        <Link to={{ pathname: '/article/' + id, search: titre }}>
          <h3>{titre}</h3>
          <p>{description}</p>
        </Link>
        {addClick ? <button onClick={addClick}>EUR {prix}</button> : null}
        {removeClick ? (
          <button style={{ backgroundColor: 'red' }} onClick={removeClick}>
            X
          </button>
        ) : null}
        <hr style={{ marginBottom: 0 }} />
      </div>
    );
  }
}

export default Article;
