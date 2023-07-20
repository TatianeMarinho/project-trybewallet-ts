import { Dispatch, FETCH_API_COIN, GetState } from '../../type';

// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const login = (email: string) => ({
  type: LOGIN,
  payload: email,
});

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCESSFUL = 'REQUEST_SUCESSFUL';
export const REQUEST_ERROR = 'REQUEST_ERROR';

// criando um action para a requisição
export const requestStarted = () => ({
  type: REQUEST_STARTED,
});
// criando action para caso sucesso
export const requestSucessful = (currencies: string[]) => ({
  type: REQUEST_SUCESSFUL,
  payload: currencies,
});
// criando action para caso falha
export const requestError = (error: string) => ({
  type: REQUEST_ERROR,
  payload: error,
});

export function fetchCurrencies() {
  return async (dispatch: Dispatch, _getState: GetState) => {
    dispatch(requestStarted());
    try {
      // fazendo a requisição a api
      const response = await fetch(FETCH_API_COIN);
      const data = await response.json();

      // deletando a parte da api 'USDT'
      delete data.USDT;

      // verificando se data e um array nao vazio
      if (data && Object.keys(data).length > 0) {
        // convertendo as chaves do objeto data para um array
        const dataArray = Object.keys(data);
        // enviando uma action se sucesso
        dispatch(requestSucessful(dataArray));
      }
    } catch (error: any) {
      dispatch(requestError(error.message));
    }
  };
}

export const fetchexchangeRates = async () => {
  const response = await fetch(FETCH_API_COIN);
  const data = await response.json();
  return data;
};

export const REQUEST_EXPENSE_NEW = 'REQUEST_EXPENSE_NEW';
// criando action para quando adicionar uma despesa
export const expenseNew = (expense: object) => ({
  type: REQUEST_EXPENSE_NEW,
  payload: expense,
});
