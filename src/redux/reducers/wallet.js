import {
  GET_CURRENCY,
  GET_CURRENCY_SUCCESS,
  GET_EXPENSES_SUCCESS,
  DELETE_EXPENSE,
} from '../actions/walletAction';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case GET_CURRENCY:
    return {
      ...state,
    };
  case GET_EXPENSES_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.expenses }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.expenseId),
    };
  default:
    return state;
  }
}

export default walletReducer;
