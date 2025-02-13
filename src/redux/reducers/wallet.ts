import { AnyAction } from 'redux';
import { REQUEST_DELETE_TABLE, REQUEST_ERROR,
  REQUEST_EXPENSE_NEW, REQUEST_STARTED, REQUEST_SUCESSFUL } from '../actions';
import { ExpensesType } from '../../type';

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
    case REQUEST_DELETE_TABLE: {
      const updateExpenses = state.expenses.filter(
        (item:ExpensesType) => item.id !== action.payload,
      );
      return {
        ...state,
        expenses: updateExpenses,
      };
    }
    default: return state;
  }
};

export default walletReducer;
