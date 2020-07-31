import * as actions from '../actionsEnum';

const stateBlueprint = {
  user: {
    infos: {
      firstname: null,
      lastname: null,
      gender: null,
      email: null,
    },
    token: null,
    userId: null,
    refreshToken: null,
  },
  error: null,
  isProcessing: true,
  isAuth: false,
};

const reducer = (previousState = stateBlueprint, action) => {
  let newState = { ...previousState };

  switch (action.type) {
    case actions.AUTH_START:
      newState.isProcessing = true;
      newState.user = stateBlueprint.user;
      newState.isAuth = false;
      break;
    case actions.AUTH_SUCCESS:
      newState.isAuth = true;
      newState.isProcessing = false;

      newState.user.token = action.payload.token;
      newState.user.userId = action.payload.userId;
      newState.user.refreshToken = action.payload.refreshToken;
      break;
    case actions.AUTH_FAIL:
      newState.isProcessing = false;
      newState.error = action.payload;
      break;
    case actions.AUTH_LOGOUT:
      newState = stateBlueprint;
      newState.isProcessing = false;
      break;
    case actions.AUTH_UPDATE_USER:
      newState.user.infos = action.payload;
      break;
    default:
  }

  return newState;
};

export default reducer;
