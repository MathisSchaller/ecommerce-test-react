import * as actions from '../actionsEnum';

const stateBlueprint = [
  {
    id: -1,
    title: 'Cannot reach data provider',
    description: 'An error occured while retriving the articles',
    price: -99,
  },
];

const reducer = (previousState = stateBlueprint, action) => {
  let newState = [...previousState];

  switch (action.type) {
    // ARTICLES
    case actions.GET_ARTICLES:
      newState = action.payload;
      break;
    case actions.DELETE_ARTICLE:
      newState = newState.filter(
        (article) => article.id !== action.payload
      );
      break;
    case actions.NEW_ARTICLE:
      newState.push(action.payload);
      break;
    default:
  }

  return newState;
};

export default reducer;
