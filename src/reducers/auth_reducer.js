import { AUTH_ERROR, GET_WEB3 } from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case AUTH_ERROR :
      return {...state, errorMessage: action.errorMessage}
    case GET_WEB3 :
      return {...state, errorMessage: 'test', web3: action.web3, addressMe: action.addressMe, addressContract: action.addressContract };
    default:
      return state;
  }
}
