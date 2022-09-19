import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import render from './helpers/renderWith';
import Login from '../pages/Login';

describe('Testando o Componente de <Login />', () => {
  it('Testando se é exibida na tela as labels com os textos "Email" e "Password', () => {
    render(<Login />);

    const PASSWORD = 'Password';
    const EMAIL = 'Email';
    const labelPassword = screen.getByLabelText(PASSWORD);
    const labelEmail = screen.getByLabelText(EMAIL);

    expect(labelPassword).toBeInTheDocument();
    expect(labelEmail).toBeInTheDocument();
  });

  it('Testando se é exibido na tela os inputs com placeholder "Username" e "Email"', () => {
    render(<Login />);

    const PASSWORD = 'Password';
    const EMAIL = 'Email';
    const labelPassword = screen.getByPlaceholderText(PASSWORD);
    const labelEmail = screen.getByPlaceholderText(EMAIL);

    expect(labelPassword).toBeInTheDocument();
    expect(labelEmail).toBeInTheDocument();
  });

  it('Testando se é exibido os botões "Play" e "Settings"', () => {
    render(<Login />);

    const btnSubmit = screen.getByText(/Entrar/i);

    expect(btnSubmit).toBeInTheDocument();
    expect(btnSubmit).toHaveTextContent('Entrar');
  });

  it('Testando se é possível interagir com os inputs', () => {
    render(<Login />);

    const PASSWORD = 'Password';
    const EMAIL = 'Email';
    const CONTENT_EMAIL = 'dinhoouropreto@email.com';
    const CONTENT_PASSWORD = 'senha@123';

    const labelPassword = screen.getByPlaceholderText(PASSWORD);
    const labelEmail = screen.getByPlaceholderText(EMAIL);

    userEvent.type(labelPassword, CONTENT_PASSWORD);
    userEvent.type(labelEmail, CONTENT_EMAIL);

    expect(labelPassword.value).toEqual(CONTENT_PASSWORD);
    expect(labelEmail.value).toEqual(CONTENT_EMAIL);
  });

  it('Testando se é possível interagir com os inputs', () => {
    const { history } = render(<Login />);

    const PASSWORD = 'Password';
    const EMAIL = 'Email';
    const CONTENT_EMAIL = 'dinhoouropreto@email.com';
    const CONTENT_PASSWORD = 'senha@123';

    const labelEmail = screen.getByPlaceholderText(EMAIL);
    const labelPassword = screen.getByPlaceholderText(PASSWORD);

    userEvent.type(labelEmail, CONTENT_EMAIL);
    userEvent.type(labelPassword, CONTENT_PASSWORD);

    expect(labelEmail.value).toEqual(CONTENT_EMAIL);
    expect(labelPassword.value).toEqual(CONTENT_PASSWORD);

    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);
    const { location: { pathname } } = history;

    expect(pathname).toEqual('/carteira');
  });
});
