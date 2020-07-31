import React from 'react';
import './NewArticle.css';

import { connect } from 'react-redux';
import { addArticle } from '../../store/articles/actions';

import Form from '../../components/UI/Form/Form';

const NewArticle = ({ addArticle, history }) => {
  const formInputs = {
    title: {
      type: 'input',
      label: 'Titre',
      config: {
        type: 'text',
        placeholder: 'Votre titre',
      },
      rules: {
        required: true,
        minLength: 5,
        maxLength: 65,
      },
      value: '',
      message: 'A title of 5 to 65 characters.',
    },
    description: {
      type: 'textarea',
      label: 'Description',
      config: {
        placeholder: 'Description de votre produit',
      },
      rules: {
        required: true,
        minLength: 5,
        maxLength: 1024,
      },
      value: '',
      message:
        'The description must be 5 to 1000 caracters long.',
    },
    price: {
      type: 'input',
      label: 'Prix',
      config: {
        type: 'number',
        placeholder: '0',
      },
      rules: {
        required: true,
        min: 0,
        max: 2147483647,
        step: 0.01,
      },
      value: '',
      message:
        'Please indicate a price above 0 and of a maximal of 2 billions',
    },
  };
  const submitNewArticle = (formData) => {
    const newArticle = {
      title: formData.title,
      desc: formData.description,
      price: formData.price * 1,
    };

    addArticle(newArticle)
      .then(() => {
        // todo reset from || redirect articles
        history.push('/vente'); //Mes articles
      })
      .catch((err) => {
        React.log(err.response);
      });
  };
  return (
    <>
      <h2>Ajouter un article</h2>
      <Form
        inputs={formInputs}
        callback={submitNewArticle}
        buttonLabel='Ajouter'
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addArticle: (article) => dispatch(addArticle(article)),
});

export default connect(null, mapDispatchToProps)(NewArticle);
