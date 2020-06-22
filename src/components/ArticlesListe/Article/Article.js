import React, { Component } from 'react';

class Article extends Component {
  render() {
    const { titre, description, prix, clicAchat, clicEnleve } = this.props;
    return (
      <div className='article'>
        <h3>{titre}</h3>
        <p>{description}</p>
        {clicAchat ? <button onClick={clicAchat}>EUR {prix}</button> : null}
        {clicEnleve ? (
          <button style={{ backgroundColor: 'red' }} onClick={clicEnleve}>
            X
          </button>
        ) : null}
        <hr style={{ marginBottom: 0 }} />
      </div>
    );
  }
}

export default Article;
