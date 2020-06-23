import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import logo from '../../../assets/logo.svg';

const FullArticle = (props) => {
  const [title, setTitle] = useState(props.location.search.slice(1));
  const [desc, setDesc] = useState(null);
  const [price, setPrice] = useState(NaN);

  useEffect(() => {
    const src = axios
      .get('/article/' + props.match.params.id + '?delay=2')
      .then((res) => {
        // console.log(res.status);
        const article = res.data;
        // console.log(article);

        setTitle(article.name);
        setDesc(article.color);
        setPrice(article.year / 100);
      })
      .catch((err) => {
        // console.log('failed');
        props.history.push({ pathname: '/404' });
      });

    return function cleanup() {
      // console.log('useEffect cleanup function');
      // console.log(axios);
      // console.log(src);
    };
  });

  return (
    <div>
      <h3>{title}</h3>
      {desc ? (
        <div>
          <p>{desc}</p>
          <p>EUR {price}</p>
          <div
            style={{
              color: 'lightgreen',
              cursor: 'pointer',
              border: '2px solid lightgreen',
              borderRadius: '5px',
              padding: '8px',
              marginBottom: '2em',
            }}
            onClick={() => props.addHandler(+props.match.params.id)}>
            Ajouter au panier
          </div>
        </div>
      ) : (
        <Suspense fallback={<div>loading...</div>}>
          <p>
            <img
              style={{
                height: '2em',
                animation: 'App-logo-spin infinite 1500ms linear',
              }}
              src={logo}
              className='App-logo'
              alt='logo'
            />
            Chargement...
          </p>
        </Suspense>
      )}
    </div>
  );
};

export default FullArticle;
