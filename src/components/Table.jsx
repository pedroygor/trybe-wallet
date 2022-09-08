import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, getEditExpense } from '../redux/actions/walletAction';

class Table extends Component {
  deleteExpenseOnClick = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(expenseId));
  };

  getEditExpenseOnClick = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(getEditExpense(expenseId));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    (Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="reset"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteExpenseOnClick(expense.id) }
                  >
                    Excluir
                  </button>
                  <button
                    type="reset"
                    data-testid="edit-btn"
                    onClick={ () => this.getEditExpenseOnClick(expense.id) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
};
Table.defaultProps = {
  expenses: [],
};
