import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './App.css';
import axios from 'axios';

import Header from '../components/Header/Header';
import ArticlesListe from '../components/ArticlesListe/ArticlesListe';

class App extends Component {
  state = {
    articles: [
      {
        id: 'art15421',
        title: 'Chaise',
        desc: 'Magnifique chaise en licra noir.',
        price: 9.99,
      },
      {
        id: 'art57516',
        title: 'Meuble TV',
        desc:
          'Petit meuble des années 60, bon état général. A venir chercher sur place.',
        price: 39.99,
      },
      {
        id: 'art05451',
        title: 'Table de salon',
        desc: 'Table ronde en bois vendue avec ses chevaliers.',
        price: 99.99,
      },
      {
        id: 'art68502',
        title: 'Mug StarWars',
        desc: "Jamais utilisé, la couleur ne s'accorde pas avec mon blaster.",
        price: 4.99,
      },
    ],
    panier: [],
  };

  achatHandler = (idArticle) => {
    const articles = this.state.articles;

    // Récuperation de l'index de l'article dans la liste selon sont ID
    const articleIndex = articles.findIndex((article) => {
      return article.id === idArticle;
    });

    // Copie de l'article
    const article = { ...articles[articleIndex] };

    const panier = [...this.state.panier];

    panier.push(article);

    this.setState({
      panier: panier,
    });
  };

  deleteHandler = (articleIndex) => {
    // Copie des articles en ligne
    const list = [...this.state.articles];

    axios
      .delete('/articles/' + list[articleIndex].id + '?delay=1')
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          list.splice(articleIndex, 1);
          this.setState({ articles: list });
        } else {
          console.log('Erreur lors de la suppresion');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removeHandler = (articleIndex) => {
    // Copie du panier de l'utilisateur
    const list = [...this.state.panier];

    list.splice(articleIndex, 1);

    this.setState({ panier: list });
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <Header cart={this.state.panier} enleveHandler={this.removeHandler} />
          <img src={logo} className='App-logo' alt='logo' />
          <h3>
            Liste des derniers articles
            <hr />
          </h3>
          <ArticlesListe
            articles={this.state.articles}
            achatHandler={this.achatHandler}
            enleveHandler={this.deleteHandler}
          />
        </header>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get('/articles?delay=2')
      .then((res) => {
        const articles = res.data;

        const updatedArticles = articles.map((article) => {
          return {
            id: article.id,
            title: article.name,
            desc: article.color,
            price: article.year / 100,
          };
        });

        const globalArticles = [...this.state.articles, ...updatedArticles];

        this.setState({
          articles: globalArticles,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default App;
