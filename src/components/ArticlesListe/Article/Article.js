import React, { Component } from 'react';

class Article extends Component {
  render() {
    const { titre, description, prix, addClick, removeClick } = this.props;
    return (
      <div className='article'>
        <h3>{titre}</h3>
        <p>{description}</p>
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
