import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Coins, UserCircle } from 'phosphor-react';
import logo from '../assets/logo.svg';

class Header extends Component {
  getDespesa = () => {
    const { expenses } = this.props;
    const despesas = expenses;
    const despesa = despesas.length > 0 ? despesas.reduce((acc, current) => {
      acc += Number(current.value) * Number(current.exchangeRates[current.currency].ask);
      return acc;
    }, 0) : 0;
    return Number(despesa).toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="flex gap-1 items-center justify-between mx-auto w-4/5 pt-8">
        <div
          className=" flex justify-start gap-2 items-center text-3xl
            font-sans"
        >
          <img src={ logo } alt="" />
          <h2 className="font-bold text-emerald-500">
            <span
              className="text-sky-700 mr-1 font-light"
            >
              Trybe
            </span>
            Wallet
          </h2>
        </div>
        <div className="flex gap-1 text-sky-700">
          <Coins
            size={ 24 }
            className="text-sky-800"
          />
          <span className="text-sky-800 font-bold">Total de despesas:</span>
          <span data-testid="total-field">{this.getDespesa()}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        <div className="flex gap-1 items-center text-emerald-500">
          <UserCircle
            size={ 24 }
            weight="regular"
            className="text-emerald-600"
          />
          <span data-testid="email-field">{ email }</span>
        </div>
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
