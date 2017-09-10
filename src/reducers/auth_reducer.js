import { AUTH_ERROR } from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case AUTH_ERROR :
        return {...state, errorMessage: action.errorMessage}
      break;
    default:
      return state;
      break;
  }
}
