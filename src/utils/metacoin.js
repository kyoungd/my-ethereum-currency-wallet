
export function transfer_fund({addressTo, amount}) {
  console.log('transfer_fund: ', addressTo, ', ', amount);
}

export function give_allowance({addressTo, amount}) {
  console.log('give_allowance: ', addressTo, ', ', amount);
}

export function spend_allowance({addressFrom, addressTo, amount}) {
  console.log('spend_allowance: ', addressFrom, ', ', addressTo, ', ', amount);
}
