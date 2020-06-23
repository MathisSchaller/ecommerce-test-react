import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LazyLoader from '../LazyLoader/LazyLoader';

import Header from '../components/Header/Header';

// import ArticlesListe from '../components/ArticlesListe/ArticlesListe';
// import FullArticle from '../components/ArticlesListe/FullArticle/FullArticle';

// Lazy loading des 2 import ci-dessus
const ArticlesListe = LazyLoader(() =>
  import('../components/ArticlesListe/ArticlesListe')
);
const FullArticle = LazyLoader(() =>
  import('../components/ArticlesListe/FullArticle/FullArticle')
);

const Page404 = () => <h1>404: Page introuvable, réessayez plus tard :)</h1>;

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
    cart: [],
  };

  addToCart = (idArticle) => {
    const articles = this.state.articles;

    console.log(idArticle);

    // Récuperation de l'index de l'article dans la liste selon sont ID
    const articleIndex = articles.findIndex((article) => {
      return article.id === idArticle;
    });

    if (articleIndex < 0) return articleIndex;

    // Copie de l'article
    const article = { ...articles[articleIndex] };

    const cart = [...this.state.cart];

    cart.push(article);

    console.log(cart);
    this.setState({
      cart: cart,
    });
  };

  deleteArticle = (articleIndex) => {
    // Copie des articles en ligne
    const articles = [...this.state.articles];

    axios
      .delete('/articles/' + articles[articleIndex].id + '?delay=1')
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          articles.splice(articleIndex, 1);
          this.setState({ articles: articles });
        } else {
          console.log('Erreur lors de la suppresion');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removeFromCart = (articleIndex) => {
    // Copie du panier de l'utilisateur
    const cart = [...this.state.cart];

    cart.splice(articleIndex, 1);

    this.setState({ cart: cart });
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <BrowserRouter>
            <Header
              cart={this.state.cart}
              removeHandler={this.removeFromCart}
            />

            <Switch>
              <Route exact path='/' />
              <Route
                exact
                path='/vente'
                render={() => (
                  <div>
                    <h3>
                      Liste des derniers articles
                      <hr />
                    </h3>
                    <ArticlesListe
                      articles={this.state.articles}
                      addHandler={this.addToCart}
                      removeHandler={this.deleteArticle}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path='/article/:id'
                render={(props) => (
                  <FullArticle {...props} addHandler={this.addToCart} />
                )}
              />
              <Route exact path='/404' component={Page404} />
              <Redirect exact from='/article' to='/vente' />
              <Redirect exact from='/articles' to='/vente' />
              <Redirect to='/404' />
            </Switch>
          </BrowserRouter>
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

        const allArticles = [...this.state.articles, ...updatedArticles];

        this.setState({
          articles: allArticles,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default App;
