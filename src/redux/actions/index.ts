import { WalletType } from '../../type';

// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const login = (email: string) => ({
  type: LOGIN,
  payload: email,
});

export const NEW_WALLET = 'NEW_WALLET';

export const wallet = (newWallet: WalletType) => ({
  type: NEW_WALLET,
  payload: newWallet,
});
