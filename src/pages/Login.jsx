import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getEmailActions } from '../redux/actions/userActions';
import logo from '../assets/logo.svg';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isValidFieldsForm: true,
    redirect: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.validateFormLogin);
  };

  validateEmail = () => {
    const { email } = this.state;
    const regex = '[a-z0-9]+@[a-z]+\\.[a-z]{2,3}';
    const mailFormat = new RegExp(regex);
    const isValidEmail = mailFormat.test(email);
    return isValidEmail;
  };

  validatePassword = () => {
    const { password } = this.state;
    const MIN_LENGTH = 6;
    const isValidPassword = password.length >= MIN_LENGTH;
    return isValidPassword;
  };

  validateFormLogin = () => {
    const isValidFieldsForm = this.validatePassword() && this.validateEmail();
    this.setState({ isValidFieldsForm: !isValidFieldsForm });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(getEmailActions(email));
    this.setState({ redirect: true });
  };

  render() {
    const { email, password, isValidFieldsForm, redirect } = this.state;
    return (
      <div
        className="bg-blend-normal bg-emerald-500 h-screen bg-bg-login bg-cover
        flex justify-center items-center"
      >
        <form
          className="w-128 h-[20rem] rounded bg-white
          flex flex-col justify-start items-center gap-4"
        >
          <div
            className="mt-14 flex justify-center gap-2 items-center text-3xl font-sans"
          >
            <img src={ logo } alt="" />
            <h2 className="font-bold text-emerald-500">
              <span
                className="text-sky-700 mr-1 font-normal"
              >
                Trybe

              </span>
              Wallet
            </h2>
          </div>
          <div>
            <label htmlFor="email">

              <input
                className="border border-solid border-sky-700 px-2 py-1 rounded w-72
                outline-none"
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                data-testid="email-input"
                value={ email }
                onChange={ this.handleChange }
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">

              <input
                className="border border-solid border-sky-700 px-2 py-1 rounded w-72
                outline-none"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                data-testid="password-input"
                value={ password }
                onChange={ this.handleChange }
                required
              />
            </label>
          </div>
          <button
            className="w-72 bg-sky-700 py-1 rounded text-white font-bold text-base"
            type="submit"
            disabled={ isValidFieldsForm }
            onClick={ this.handleClick }
            data-testid="btn-submit"
          >
            Entrar

          </button>

          {redirect && <Redirect to="/carteira" />}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
