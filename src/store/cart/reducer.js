import * as actions from '../actionsEnum';

const stateBlueprint = [
  {
    id: -1,
    title: 'Default cart item',
    price: -99,
  },
];

const reducer = (oldState = stateBlueprint, action) => {
  let newState = [...oldState];

  switch (action.type) {
    // CART
    case actions.LOAD_CART:
      newState = action.payload;
      break;
    case actions.ADD_CART:
      newState.push(action.payload);
      break;
    case actions.REMOVE_CART:
      newState = newState.filter(
        (article) => article.id !== action.payload
      );
      break;
    case actions.CLEAR_CART:
      newState = [];
      break;
    default:
  }

  return newState;
};

export default reducer;
