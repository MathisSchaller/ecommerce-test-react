import React from 'react';
import Article from './Article/Article';

const ArticlesListe = ({
  articles,
  addHandler,
  removeHandler,
}) => (
  <div id='articlesList'>
    {articles
      ? articles.map((article) => (
          <Article
            key={article.id}
            article={article}
            removeClick={
              removeHandler
                ? () => removeHandler(article.id)
                : undefined
            }
            addClick={
              addHandler ? () => addHandler(article) : undefined
            }
          />
        ))
      : null}
  </div>
);

export default ArticlesListe;
