import { AnyAction } from 'redux';
import { REQUEST_ERROR,
  REQUEST_EXPENSE_NEW, REQUEST_STARTED, REQUEST_SUCESSFUL } from '../actions';

export const INITIAL_WALLET = {
  isFetching: false,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const walletReducer = (state = INITIAL_WALLET, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_STARTED: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case REQUEST_SUCESSFUL: {
      return {
        ...state,
        isFetching: false,
        currencies: action.payload,
      };
    }
    case REQUEST_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }
    case REQUEST_EXPENSE_NEW: {
      return {
        ...state,
        // para adicionar mais expenses ao estado criando um array
        expenses: [...state.expenses, action.payload],
      };
    }
    default: return state;
  }
};

export default walletReducer;
