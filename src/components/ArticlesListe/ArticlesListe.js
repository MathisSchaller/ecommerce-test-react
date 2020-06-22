import React, { Component } from 'react';
import Article from './Article/Article';

class ArticlesListe extends Component {
  render() {
    const { articles, addHandler, removeHandler } = this.props;

    return (
      <div id='articlesList'>
        {articles.map((article, index) => {
          return (
            <Article
              key={index}
              titre={article.title}
              description={article.desc}
              prix={article.price}
              removeClick={
                removeHandler ? () => removeHandler(index) : undefined
              }
              addClick={addHandler ? () => addHandler(article.id) : undefined}
              /* équivalent pour non adepte es6 (2015)
              clicAchat={function () {
                achatHandler(article.id);
              }}
              */
            />
          );
        })}
      </div>
    );
  }
}

export default ArticlesListe;
