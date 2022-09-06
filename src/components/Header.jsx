import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  getDespesa = () => {
    const { expenses } = this.props;
    const despesas = expenses;
    console.log(expenses);
    const despesa = despesas.length > 0 ? despesas.reduce((acc, current) => {
      acc += Number(current.value) * Number(current.exchangeRates[current.currency].ask);
      return acc;
    }, 0) : 0;
    return Number(despesa).toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>
        <span data-testid="email-field">{ email }</span>
        <span>Despesa Total:</span>
        <span data-testid="total-field">{this.getDespesa()}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
};
Header.defaultProps = {
  expenses: [],
};
