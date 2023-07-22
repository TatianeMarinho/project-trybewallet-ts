import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const email1 = 'vitoria@gmail.com';
const email2 = 'viva.via@gmail.com';
const emailError1 = 've.com.br';
const emailError2 = 'v@gmailcom';
const password1 = 'hjkpo098';
const password2 = '098754d';
const passwordError1 = 'ert12';
const passwordError2 = '34t';
const carteira = 'BRL';
const inputE = 'email-input';
const inputP = 'password-input';

describe('verificando se há uma página de login', () => {
  it('O componente Login renderiza na tela', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByText('e-mail:')).toBeInTheDocument();
  });

  it('existe dois input do tipo texto na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputs = screen.getAllByRole('textbox');

    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('existe um botao na tela', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('o botao so é clicavel se os inputs forem preenchidos corretamente', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(inputE);
    const inputPassword = screen.getByTestId(inputP);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();

    await userEvent.type(inputEmail, email2);
    await userEvent.type(inputPassword, password2);
    expect(button).toBeEnabled();

    await userEvent.clear(inputEmail);
    await userEvent.clear(inputPassword);
    await userEvent.type(inputEmail, emailError1);
    await userEvent.type(inputPassword, passwordError1);
    expect(button).toBeDisabled();

    await userEvent.clear(inputEmail);
    await userEvent.clear(inputPassword);
    await userEvent.type(inputEmail, email2);
    await userEvent.type(inputPassword, password2);
    expect(button).toBeEnabled();

    await userEvent.clear(inputEmail);
    await userEvent.clear(inputPassword);
    await userEvent.type(inputEmail, emailError2);
    await userEvent.type(inputPassword, passwordError2);
    expect(button).toBeDisabled();
  });

  it('ao clicar no botão Entrar vai para a pagina /carteira', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(inputE);
    const inputPassword = screen.getByTestId(inputP);
    const button = screen.getByRole('button');

    await userEvent.type(inputEmail, email1);
    await userEvent.type(inputPassword, password1);
    await userEvent.click(button);
    // para verificar se a rota foi alterada para /carteira
    expect(screen.getByRole('heading', { name: carteira })).toBeInTheDocument();
  });
});

describe('verificando a pagina carteira', () => {
  it('o email logado aparece na tela', async () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(inputE);
    const inputPassword = screen.getByTestId(inputP);
    const button = screen.getByRole('button');

    await userEvent.type(inputEmail, email1);
    await userEvent.type(inputPassword, password1);
    await userEvent.click(button);
    // para verificar se a rota foi alterada para /carteira
    expect(store.getState().user.email).toBe(email1);
  });

  it('existe dois inputs na tela', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(inputE);
    const inputPassword = screen.getByTestId(inputP);
    const button = screen.getByRole('button');

    await userEvent.type(inputEmail, email1);
    await userEvent.type(inputPassword, password1);
    await userEvent.click(button);

    const inputs = screen.getAllByRole('textbox');

    expect(inputs.length).toBeGreaterThanOrEqual(1);
  });

  it('existe um select para moedaspa', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(inputE);
    const inputPassword = screen.getByTestId(inputP);
    const button = screen.getByRole('button');

    await userEvent.type(inputEmail, email1);
    await userEvent.type(inputPassword, password1);
    await userEvent.click(button);

    const selectCurrency = screen.getByTestId('currency-input');

    expect(selectCurrency).toBeInTheDocument();
  });
});
