export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_CURRENCY_SUCCESS = 'GET_CURRENCY_SUCCESS';
export const GET_CURRENCY_FAILURE = 'GET_CURRENCY_FAILURE';

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
