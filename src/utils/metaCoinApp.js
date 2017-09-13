
export function transfer(Metacoin, receiver, amount) => {
  var meta;

  return MetaCoin.deployed().then(function(instance) {
    meta = instance;
    return meta.transfer(receiver, amount, {from:account, gas:gasLimit});
  }).then(function() {
    return refreshBalance(MetaCoin);
  }).catch(function(e) {
    console.log("Error sending coin; see log. ", e);
  });
}

export function transferFrom(MetaCoin, from, receiver, amount) -> {
  var meta;

  return MetaCoin.deployed().then(function(instance) {
    meta = instance;
    return meta.transferFrom(from, receiver, amount, {from:account, gas:gasLimit});
  }).then(function() {
    return refreshBalance(MetaCoin);
    // setStatus("Transfer Complete.");
  }).catch(function(e) {
    console.log("Error sending coin; see log.");
  });
}

export function transferFund(MetaCoin, fromAddress, amount, receiverAddress) {
  if (fromAddress === null || fromAddress.length <= 2)
    transfer(MetaCoin, receiverAddress, amount);
  else {
    transferFrom(MetaCoin, fromAddress, receiverAddress, amount)
  }
}

export function buyToken(MetaCoin, amount) => {
  var meta;
  return MetaCoin.deployed().then(function(instance) {
    meta = instance;
    return meta.buy({from:account, value:amount, gas:gasLimit});
  }).then(function() {
    return refreshBalance(MetaCoin);
    // self.setStatus("Token purchase complete.");
  }).catch(function(e) {
    console.log("Error token purchase; see log.");
  });
}

export function sellToken(MetaCoin, amount) => {
  var meta;
  return MetaCoin.deployed().then(function(instance) {
    meta = instance;
    return meta.sell(amount, {from:account, gas:gasLimit});
  }).then(function() {
    return refreshBalance(MetaCoin);
    // self.setStatus("Token sale complete.");
  }).catch(function(e) {
    // self.setStatus("Error token sale; see log.");
    console.log(e);
  });
}

export function approveFund(MetaCoin, amount, receiverAddress) => {
  var meta;
  return MetaCoin.deployed().then(function(instance) {
    meta = instance;
    return meta.approve(receiverAddress, amount, {from:account, gas:gasLimit});
  }).then(function() {
    // self.setStatus("Approve Complete.");
    return refreshBalance(MetaCoin);
  }).catch(function(e) {
    // self.setStatus("Error approve allowance; see log.");
    console.log(e);
  });
}

export function freezeAccount(MetaCoin, isFreeze, receiver) {
  var meta;
  return MetaCoin.deployed().then(function(instance) {
    meta = instance;
    return meta.freezeAccount(receiver, isFreeze, {from:account, gas:gasLimit});
  }).then(function() {
    return refreshBalance(MetaCoin);
    // self.setStatus("Account frozen. " + receiver);
  }).catch(function(e) {
    // self.setStatus("Error while freezing account; see log.");
    console.log(e);
  });
}

export function mintToken(MetaCoin, amount, receiver) {
  var meta;
  return MetaCoin.deployed().then(function(instance) {
    meta = instance;
    return meta.mintToken(receiver, amount, {from:account, gas:gasLimit});
  }).then(function() {
    return refreshBalance(MetaCoin);
    // self.setStatus("New token minted.");
  }).catch(function(e) {
    // self.setStatus("New token was not minted; see log.");
    console.log(e);
  });
}

export function setPrices(MetaCoin, sellPrice, buyPrice) {
  var meta;
  return MetaCoin.deployed().then(function(instance) {
    meta = instance;
    return meta.setPrices(sellPrice, buyPrice, {from:account, gas:gasLimit});
  }).then(function() {
    self.setStatus("Buy/Sell price set!");
    self.refreshBalance(MetaCoin);
  }).catch(function(e) {
    console.log('ERROR setPrice(): ' + e);
  });
}

export function refreshBalance(MetaCoin) {
  var meta;
  MetaCoin.deployed().then(function(instance) {
    meta = instance;
    return meta.balanceOf.call(account, {from: account});
  }).then(function(value) {
    var balance_element = document.getElementById("balance");
    return value.valueOf();
  }).catch(function(e) {
    console.log(e);
    // self.setStatus("Error getting balance; see log.");
  });
}

export function sendCoin(MetaCoin, amount, receiver) {
  var meta;
  MetaCoin.deployed().then(function(instance) {
    meta = instance;
    return meta.sendCoin(receiver, amount, {from: account});
  }).then(function() {
    // self.setStatus("Transaction complete!");
    return refreshBalance(MetaCoin);
  }).catch(function(e) {
    console.log(e);
    // self.setStatus("Error sending coin; see log.");
  });
}
