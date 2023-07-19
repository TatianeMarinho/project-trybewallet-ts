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
  exchangeRates: string;
};
