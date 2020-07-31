import * as actions from '../actionsEnum';
import axios from 'axios';

const apiUrl = 'https://bd-test-hooks.firebaseio.com/articles';

export const addArticle = (article) => {
  return (dispatch, getState) => {
    const token = getState().auth.user.token;
    article.userId = getState().auth.user.userId;

    return axios
      .post(`${apiUrl}.json?auth=${token}`, article)
      .then((res) => {
        const firebaseId = res.data.name;
        // ajouter a article dans state
        article.id = firebaseId;
        dispatch(add(article));
      });
  };
};

export const deleteArticle = (id) => {
  return (dispatch, getState) => {
    const token = getState().auth.user.token;

    axios
      .delete(apiUrl + `/${id}.json?auth=${token}`)
      .then(() => dispatch(remove(id)))
      .catch((err) => console.log('Err suppr article', err));
  };
};

export const searchArticle = (param) => {
  return (dispatch) => {
    axios
      .get(`${apiUrl}.json`)
      .then((res) => {
        const articles = res.data;

        let updatedArticles = [];
        for (const id in articles) {
          updatedArticles.push({
            ...articles[id],
            id: id,
          });
        }

        dispatch(setAll(updatedArticles));
      })
      .catch((err) => {
        console.log('Err search articles');
        console.log(err);
        console.log(err.response.data.error);
      });
  };
};

export const getArticleById = (id) => {
  return axios.get(`${apiUrl}/${id}.json`);
};

// State
const add = (article) => {
  return {
    type: actions.NEW_ARTICLE,
    payload: article,
  };
};

const remove = (id) => {
  return {
    type: actions.DELETE_ARTICLE,
    payload: id,
  };
};

const setAll = (articles) => {
  return {
    type: actions.GET_ARTICLES,
    payload: articles,
  };
};
