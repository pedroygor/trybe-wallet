import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencyThunk,
  getExpensiveThunk, setEditExpense } from '../redux/actions/walletAction';

const INITIAL_STATE = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(getCurrencyThunk());
  }

  componentDidUpdate(prevProps) {
    const { isEdit } = this.props;
    if (prevProps.isEdit !== isEdit && isEdit) {
      const { idToEdit, expenses } = this.props;
      const despesa = expenses
        .find(({ id }) => idToEdit === id);
      this.setState({
        value: despesa.value,
        currency: despesa.currency,
        method: despesa.method,
        tag: despesa.tag,
        description: despesa.description,
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { currency, description, method, tag, value } = this.state;
    const newExpenses = {
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(getExpensiveThunk(newExpenses));
    this.setState(INITIAL_STATE);
  };

  editExpenseOnclick = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const expanse = {
      value,
      currency,
      method,
      tag,
      description,
    };
    dispatch(setEditExpense(expanse));
    this.setState(INITIAL_STATE);
  };

  render() {
    const { currencies, isEdit } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              data-testid="value-input"
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((item) => (
                <option key={ item } value={ item }>{item}</option>
              ))}
            </select>
          </label>

          <label htmlFor="expenses">
            Método de Pagamento
            <select
              name="method"
              id="expenses"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Categorias
            <select
              name="tag"
              id="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          {
            isEdit
              ? (
                <button
                  type="submit"
                  onClick={ this.editExpenseOnclick }
                >
                  Editar despesa
                </button>
              )
              : (
                <button
                  type="submit"
                  onClick={ this.handleClick }
                >
                  Adicionar despesa
                </button>
              )
          }
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
    isEdit: state.wallet.editor,
    idToEdit: state.wallet.idToEdit,
  };
}

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  isEdit: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

WalletForm.defaultProps = {
  expenses: [],
};
