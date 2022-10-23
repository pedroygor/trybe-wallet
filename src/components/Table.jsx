import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Trash, PencilLine } from 'phosphor-react';
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
      <div
        className="w-11/12 mx-auto bg-sky-700 h-3/5 rounded-xl text-white absolute
      top-48 inset-x-4 px-2 pt-32"
      >
        <table className="w-full table-auto border-collapse border border-slate-400">
          <thead className="mx-auto">
            <tr>
              <th className="border border-slate-200 p-2">Descrição</th>
              <th className="border border-slate-200 p-2">Tag</th>
              <th className="border border-slate-200 p-2">Método de pagamento</th>
              <th className="border border-slate-200 p-2">Valor</th>
              <th className="border border-slate-200 p-2">Moeda</th>
              <th className="border border-slate-200 p-2">Câmbio utilizado</th>
              <th className="border border-slate-200 p-2">Valor convertido</th>
              <th className="border border-slate-200 p-2">Moeda de conversão</th>
              <th className="border border-slate-200 p-2">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td className="border border-slate-200 px-2">{expense.description}</td>
                <td className="border border-slate-200 px-2">{expense.tag}</td>
                <td className="border border-slate-200 px-2">{expense.method}</td>
                <td className="border border-slate-200 px-2">
                  {Number(expense.value).toFixed(2)}

                </td>
                <td className="border border-slate-200 px-2">
                  {expense.exchangeRates[expense.currency].name}

                </td>
                <td className="border border-slate-200 px-2">
                  {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}

                </td>
                <td className="border border-slate-200 px-2">
                  {
                    (Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)
                  }
                </td>
                <td className="border border-slate-200 px-2">Real</td>
                <td
                  className="border border-slate-200 px-2"
                >
                  <div className="w-full flex gap-2 justify-center items-center">
                    <button
                      type="reset"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExpenseOnClick(expense.id) }
                    >
                      <Trash
                        size={ 18 }
                      />
                    </button>
                    <button
                      type="reset"
                      data-testid="edit-btn"
                      onClick={ () => this.getEditExpenseOnClick(expense.id) }
                    >
                      <PencilLine
                        size={ 18 }
                      />
                    </button>
                  </div>
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
