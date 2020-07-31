import React from 'react';
import { Link } from 'react-router-dom';
import './Account.css';

import Form from '../../components/UI/Form/Form';
import infosInputs from './FormsData/AccountInfo';

import { connect } from 'react-redux';
import { updateUserInfos } from '../../store/auth2/actions';

const Account = (props) => {
  const submitUpdateInfos = (values) => {
    const newInfos = {
      firstname: values['firstname'],
      lastname: values['lastname'],
      gender: values['gender'],
    };
    props
      .updateUserInfos(newInfos)
      .then(() => props.history.push('/'));
  };

  return (
    <div className='Account'>
      <Link to='/logout'>
        <button>Déconnexion</button>
      </Link>

      <h2>Mes informations</h2>
      <Form
        inputs={infosInputs(props.userInfos)}
        callback={submitUpdateInfos}
        buttonLabel='Sauvegarder'
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateUserInfos: (infos) => dispatch(updateUserInfos(infos)),
});

const mapStateToProps = (state) => ({
  userInfos: state.auth.user.infos,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
