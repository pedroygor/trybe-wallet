import {
  GET_CURRENCY,
  GET_CURRENCY_FAILURE,
  GET_CURRENCY_SUCCESS,
} from '../actions/walletAction';

const INITIAL_STATE = {
  currencies: [],
  error: null,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case GET_CURRENCY_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  case GET_CURRENCY:
    return {
      ...state,
    };
  default:
    return state;
  }
}

export default walletReducer;
