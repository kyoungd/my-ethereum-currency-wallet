import { transfer_fund, give_allowance, spend_allowance, buy_token, sell_token, mint_token, buy_sell_price } from '../utils/metacoin';
import { AUTH_ERROR, GET_WEB3 } from './types';

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

export function giveAllowance({addressTo, amount}) {
  return function(dispatch) {
    console.log('/src/actions/index.js/give_allowance()')
    console.log('addressTo: ', addressTo);
    console.log('amount: ', amount);
    give_allowance({addressTo, amount});
    dispatch(authError('/src/actions/index.js/give_allowance() test error'));
  }
}

export function spendAllowance({addressTo, amount}) {
  return function(dispatch) {
    console.log('/src/actions/index.js/spend_allowance()')
    console.log('addressTo: ', addressTo);
    console.log('amount: ', amount);
    spend_allowance({addressTo, amount});
    dispatch(authError('/src/actions/index.js/spend_allowance() test error'));
  }
}

export function buyTokens({amount}){
  return function(dispatch) {
    console.log('/src/actions/index.js/buyTokens()')
    console.log('amount: ', amount);
    buy_token({amount});
    dispatch(authError('/src/actions/index.js/buy_token() test error'));
  }
}

export function sellTokens({amount}){
  return function(dispatch) {
    console.log('/src/actions/index.js/sellTokens()')
    console.log('amount: ', amount);
    sell_token({amount});
    dispatch(authError('/src/actions/index.js/sell_token() test error'));
  }
}

export function mintTokens({amount}){
  return function(dispatch) {
    console.log('/src/actions/index.js/mintTokens()')
    console.log('amount: ', amount);
    mint_token({amount});
    dispatch(authError('/src/actions/index.js/mint_token() test error'));
  }
}

export function buySellPrice({buyPrice, sellPrice}) {
  return function(dispatch) {
    console.log('/src/actions/index.js/buySellPrice()')
    console.log('buy sell price : ', buyPrice, '  ', sellPrice);
    buy_sell_price({buyPrice, sellPrice});
    dispatch(authError('/src/actions/index.js/buy_sell_price() test error'));
  }
}

export function getMyWeb3({web3, addressMe, addressContract}) {
  return function(dispatch) {
    dispatch({
      type: GET_WEB3,
      web3,
      addressMe,
      addressContract
    });
  }
}

export function authError(errorMessage) {
  return {
    type: AUTH_ERROR,
    errorMessage: errorMessage
  };
}
