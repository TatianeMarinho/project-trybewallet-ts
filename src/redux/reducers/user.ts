// Esse reducer será responsável por tratar as informações da pessoa usuária
import { AnyAction } from 'redux';
import { LOGIN } from '../actions/index';

const userReducer = (state = { email: '' }, action: AnyAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
