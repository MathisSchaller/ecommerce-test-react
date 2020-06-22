import React, { Component } from 'react';
import Article from './Article/Article';

class ArticlesListe extends Component {
  render() {
    const { articles, achatHandler, enleveHandler } = this.props;

    return (
      <div id='articlesList'>
        {articles.map((article, index) => {
          return (
            <Article
              key={index}
              titre={article.title}
              description={article.desc}
              prix={article.price}
              clicEnleve={
                enleveHandler ? () => enleveHandler(index) : undefined
              }
              clicAchat={
                achatHandler ? () => achatHandler(article.id) : undefined
              }
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
