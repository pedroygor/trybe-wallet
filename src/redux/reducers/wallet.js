import {
  GET_CURRENCY,
  GET_CURRENCY_SUCCESS,
  GET_EXPENSES_SUCCESS,
  DELETE_EXPENSE,
  GET_EDIT_EXPENSE,
  SET_EDIT_EXPENSE,
} from '../actions/walletAction';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  let newExpanses = [];
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
  case GET_EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.expenseId,
      editor: true,
    };
  case SET_EDIT_EXPENSE:
    newExpanses = state.expenses.reduce((acc, current) => {
      if (current.id === state.idToEdit) {
        current.value = action.expense.value;
        current.tag = action.expense.tag;
        current.description = action.expense.description;
        current.currency = action.expense.currency;
        current.method = action.expense.method;
      }
      acc.push(current);
      return acc;
    }, []);
    return {
      ...state,
      expenses: [...newExpanses],
      idToEdit: 0,
      editor: false,
    };
  default:
    return state;
  }
}

export default walletReducer;
