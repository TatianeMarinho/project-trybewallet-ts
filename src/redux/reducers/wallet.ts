import { AnyAction } from 'redux';

const INITIAL_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const walletReducer = (state = INITIAL_WALLET, action: AnyAction) => {
  switch (action.type) {
    default: return state;
  }
};

export default walletReducer;
