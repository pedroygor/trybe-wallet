export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_CURRENCY_SUCCESS = 'GET_CURRENCY_SUCCESS';
export const GET_CURRENCY_FAILURE = 'GET_CURRENCY_FAILURE';
export const GET_EXPENSES = 'GET_EXPENSES';
export const GET_EXPENSES_SUCCESS = 'GET_EXPENSES_SUCCESS';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const GET_EDIT_EXPENSE = 'GET_EDIT_EXPENSE';
export const SET_EDIT_EXPENSE = 'SET_EDIT_EXPENSE';

const getCurrencySuccess = (currencies) => ({
  type: GET_CURRENCY_SUCCESS,
  currencies,
});

const getCurrencyFailure = (error) => ({
  type: GET_CURRENCY_FAILURE,
  error,
});

const getCurrency = () => ({
  type: GET_CURRENCY,
});

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  expenseId,
});

export const getEditExpense = (expenseId) => ({
  type: GET_EDIT_EXPENSE,
  expenseId,
});

export const setEditExpense = (expense) => ({
  type: SET_EDIT_EXPENSE,
  expense,
});

export const getCurrencyThunk = () => async (dispatch) => {
  dispatch(getCurrency());
  try {
    const URL_CURRENCY = 'https://economia.awesomeapi.com.br/json/all';

    const response = await fetch(URL_CURRENCY);
    const data = await response.json();
    const currencies = Object.keys(data)
      .filter((currency) => currency !== 'USDT');
    dispatch(getCurrencySuccess(currencies));
  } catch (error) {
    dispatch(getCurrencyFailure(error.message));
  }
};

export const getExpenses = (expenses) => ({
  type: GET_EXPENSES,
  expenses,
});

const getExpensesSuccess = (expenses) => ({
  type: GET_EXPENSES_SUCCESS,
  expenses,
});

export const getExpensiveThunk = (expenses) => async (dispatch) => {
  // dispatch(getCurrency());

  const URL_CURRENCY = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL_CURRENCY);
  const data = await response.json();
  // const currencies = Object.keys(data)
  //   .filter((currency) => currency !== 'USDT');
  // const values = Object.values(data)
  //   .filter((value) => value.codein !== 'BRLT');

  // const exchangeRates = currencies.reduce((acc, current, index) => {
  //   acc[current] = {
  //     code: values[index].code,
  //     name: values[index].name,
  //     ask: values[index].ask,
  //   };
  //   return acc;
  // }, {});
  expenses.exchangeRates = data;

  dispatch(getExpensesSuccess(expenses));
};
