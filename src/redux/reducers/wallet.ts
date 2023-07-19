import { AnyAction } from 'redux';
import { NEW_WALLET } from '../actions';

const INITIAL_WALLET = {
  currencies: [],
  expenses: [
    {
      id: 0,
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
      exchangeRates: '',
    },
  ],
  editor: false,
  idToEdit: 0,
};
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const walletReducer = (state = INITIAL_WALLET, action: AnyAction) => {
  switch (action.type) {
    case NEW_WALLET: {
      return {
        ...state,
        wallet: action.payload,
      };
    }
    default: return state;
  }
};

export default walletReducer;
