import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export const INITIAL_STATE_FORM = {
  email: '',
  password: '',
};

export type UserType = {
  email: string;
};

export type WalletType = {
  currencies: string[];
  expenses: ExpensesType[];
  editor: boolean;
  idToEdit: number;
};

export type StateType = {
  user: UserType;
  wallet: WalletType;
};

export type ExpensesType = {
  id: number;
  value: number;
  currency: string;
  method: string;
  tag: string;
  description: string;
  exchangeRates: {
    [key: string]: {
      code: string,
      name: string,
      ask: string,
    }
  }
};

/* export type ExchangeRatesType = ; */

export type GetState = () => StateType;

export type Dispatch = ThunkDispatch<StateType, null, AnyAction>;

export const FETCH_API_COIN = 'https://economia.awesomeapi.com.br/json/all';

export const INICIAL_FORM_EXPENSES = {
  id: 0,
  value: 0,
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
  exchangeRates: {
  },
};

export type ActionType = {
  type: string;
  payload: any;
  isFetching?: string;
  currencies?: string[];
  error?: any;
};
