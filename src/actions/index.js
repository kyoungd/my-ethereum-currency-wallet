import { transfer_fund } from '../utils/metacoin';
import { AUTH_ERROR } from './types';

export function transferFund({addressTo, amount}) {
  return function(dispatch) {
    // submit to Transfer Fund method.
    console.log('/src/actions/index.js/transferFund()')
    console.log('addressTo: ', addressTo);
    console.log('amount: ', amount);
    transfer_fund({addressTo, amount});
    dispatch(authError('test error'));
    // if request is Good
    // update the totalAmount count
    // else
    // display message

    // if request is bad.
    // - show an error to the user.
  }
}

export function authError(errorMessage) {
  return {
    type: AUTH_ERROR,
    errorMessage: errorMessage
  };
}
