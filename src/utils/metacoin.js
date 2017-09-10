
export function transfer_fund({addressTo, amount}) {
  console.log('transfer_fund: ', addressTo, ', ', amount);
}

export function allowance({addressFrom, addressTo, amount}) {
  console.log('allowance: ', addressFrom, ', ', addressTo, ', ', amount);
}
