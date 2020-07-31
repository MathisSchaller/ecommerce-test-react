import * as actions from '../actionsEnum';

const stateBlueprint = [
  {
    id: 'database unreachale',
    date: new Date(),
    articles: [
      {
        id: -1,
        title: 'An error occured while retriving the orders',
        price: 99,
      },
    ],
    totalPrice: 96.04,
    fees: '1.99',
    discount: '5%',
  },
];

const reducer = (oldState = stateBlueprint, action) => {
  let newState = [...oldState];

  switch (action.type) {
    case actions.GET_ORDERS:
      newState = action.payload;
      break;
    case actions.ADD_ORDER:
      newState.push(action.payload);
      break;
    case actions.CLEAR_ORDERS:
      newState = [];
      break;
    default:
  }

  return newState;
};

export default reducer;
