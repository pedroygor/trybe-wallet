import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEmailActions } from '../redux/actions/userActions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isValidFieldsForm: true,
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
    const { dispatch, history: { push } } = this.props;
    const { email } = this.state;
    dispatch(getEmailActions(email));
    push('/carteira');
  };

  render() {
    const { email, password, isValidFieldsForm } = this.state;
    return (
      <div>
        <form>
          <div>
            <label htmlFor="email">
              Email
              <input
                type="text"
                name="email"
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
              Password
              <input
                type="password"
                name="password"
                id="password"
                data-testid="password-input"
                value={ password }
                onChange={ this.handleChange }
                required
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={ isValidFieldsForm }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
