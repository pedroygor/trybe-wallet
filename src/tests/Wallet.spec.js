import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import mockData from './helpers/mockData';
import render from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';

const MOCK_DESPESA = {
  expense: 5,
  description: 'coxinha',
  currency: 'USD',
  method: 'Cartão de crédito',
  tag: 'Alimentação',
};

const NEW_MOCK_DESPESA = {
  expense: 30,
  description: 'pizza',
  currency: 'USD',
  method: 'Cartão de crédito',
  tag: 'Alimentação',
};

const criarDespesa = ({ expense, description, currency, method, tag }) => {
  const valueInput = screen.getByTestId('value-input');
  const descriptionInput = screen.getByTestId('description-input');
  const currencyInput = screen.getByTestId('currency-input');
  const methodInput = screen.getByTestId('method-input');
  const tagInput = screen.getByTestId('tag-input');

  userEvent.paste(valueInput, expense);
  userEvent.type(descriptionInput, description);
  userEvent.selectOptions(currencyInput, [currency]);
  userEvent.selectOptions(methodInput, [method]);
  userEvent.selectOptions(tagInput, [tag]);
};

const preencheLogin = () => {
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
};

describe('Testando o Componente de <Wallet />', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });
  });

  it('Testando o Header  do componente Wallet', () => {
    render(<App />);
    preencheLogin();
    const h1 = screen.getByRole('heading', { level: 1 });
    const email = screen.getByText(/dinhoouropreto@email.com/i);
    const textoDeDescricaoDespesa = screen.getByText(/despesa total:/i);
    const numeroDeDespesa = screen.getByText(/0/i);
    const moeda = screen.getByText(/brl/i);

    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent(/trybewallet/i);
    expect(email).toBeInTheDocument();
    expect(textoDeDescricaoDespesa).toBeInTheDocument();
    expect(numeroDeDespesa).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
  });

  it('Testando se adiciona despesas corretamente', async () => {
    render(<Wallet />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    criarDespesa(MOCK_DESPESA);

    const buttonAddDespesa = screen.getByRole('button');
    expect(buttonAddDespesa).toBeInTheDocument();

    userEvent.click(buttonAddDespesa);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const inputValue = screen.getByLabelText('Valor');
    expect(inputValue).toHaveTextContent('');
    const tableTdDespesa = screen.getByText('coxinha');
    expect(tableTdDespesa).toBeInTheDocument();

    const buttonDelete = screen.getByTestId('delete-btn');
    expect(buttonDelete).toBeInTheDocument();

    userEvent.click(buttonDelete);
    expect(tableTdDespesa).not.toBeInTheDocument();
  });

  it('Testando se edita as despesas corretamente', async () => {
    render(<Wallet />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    criarDespesa(MOCK_DESPESA);

    const buttonAddDespesa = screen.getByRole('button');
    expect(buttonAddDespesa).toBeInTheDocument();

    userEvent.click(buttonAddDespesa);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const buttonEdit = screen.getByTestId('edit-btn');
    expect(buttonEdit).toBeInTheDocument();

    userEvent.click(buttonEdit);

    const editarDespesa = screen.getByText('Editar despesa');
    expect(editarDespesa).toBeInTheDocument();

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    criarDespesa(NEW_MOCK_DESPESA);

    userEvent.click(editarDespesa);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });
});
