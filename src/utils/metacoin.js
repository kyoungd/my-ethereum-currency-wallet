
export function transfer_fund({addressTo, amount}) {
  console.log('transfer_fund: ', addressTo, ', ', amount);
}

export function give_allowance({addressTo, amount}) {
  console.log('give_allowance: ', addressTo, ', ', amount);
}

export function spend_allowance({addressFrom, addressTo, amount}) {
  console.log('spend_allowance: ', addressFrom, ', ', addressTo, ', ', amount);
}

export function buy_token({amount}) {
  console.log('buy_token: ', amount);
}

export function sell_token({amount}) {
  console.log('sell_token: ', amount);
}

export function mint_token({amount}) {
  console.log('mint_token: ', amount);
}

export function buy_sell_price({buyPrice, sellPrice}) {
  console.log('buy_sell_price: ', buyPrice, ', ', sellPrice);
}
