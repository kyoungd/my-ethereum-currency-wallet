
var MetaCoin = artifacts.require("./MetaCoin.sol");

contract('MetaCoin', function(accounts) {

  it("should put 10000000000000 MetaCoin in the first account", function() {
    return MetaCoin.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000000000000, "10000000000000 wasn't in the first account");
    }).catch(function(e) {
      console.log(e);
    });
  });

  it("should setPrices corectly", function() {
    var meta;
    var sellCost;
    var buyCost;

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.setPrices(1,2);
    }).then(function(result) {
      return meta.getSellPrice.call();
    }).then(function(balance) {
      sellCost = balance.toNumber();
      return meta.getBuyPrice.call();
    }).then(function(balance) {
      buyCost = balance.toNumber();
      assert.equal(sellCost, 1, "method setPrice() EXCEPTION: The getSellPrice() should be 1 instead of " + sellCost);
      assert.equal(buyCost, 2, "method setPrice() EXCEPTION: The getBuyPrice() should be 2 instead of " + buyCost);
    }).catch(function(e) {
      console.log(e);
    });
  });

  it("set allowance correctly", function() {
    var meta;

    //    Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];
    var amount = 10;

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.approve(account_two, amount);
    }).then(function(result) {
      var foundEvent = false;
      for (var i = 0; i < result.logs.length; i++)
      {
        var log = result.logs[i];
        if (log.event == "Approval")
          foundEvent = true;
      }
      assert.equal(foundEvent, true, "method approve() EXCEPTION: Approval event not found.");
      return meta.balanceOf.call(account_one);
    }).then(function(result) {
      return meta.allowance.call(account_one, account_two);
    }).then(function(balance) {
      var allowanceAmount = balance.toNumber();
      assert.equal(allowanceAmount, amount, "method approve() EXCEPTION: allowance does not match.");
    }).catch(function(e) {
      console.log(e);
    });
  });

  it("should transferFrom coin correctly", function() {
    var meta;

    //    Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.approve(account_one, 20);
    }).then(function(result) {
      return meta.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return meta.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return meta.transferFrom(account_one, account_two, amount);
    }).then(function(result) {
      var foundEvent = false;
      for (var i = 0; i < result.logs.length; i++)
      {
        var log = result.logs[i];
        if (log.event == "Transfer")
          foundEvent = true;
      }
      assert.equal(foundEvent, true, "method transferFrom() EXCEPTION: Transfer event not found.");
      return meta.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return meta.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "method transferFrom() EXCEPTION: Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "method transferFrom() EXCEPTION: Amount wasn't correctly sent to the receiver");
    }).catch(function(e) {
      console.log(e);
    });
  });

  it("should transfer coin correctly", function() {
    var meta;

    //    Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.setPrices(1,2);
    }).then(function(result) {
      return meta.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return meta.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return meta.transfer(account_two, amount);
    }).then(function(result) {
      var foundEvent = false;
      for (var i = 0; i < result.logs.length; i++)
      {
        var log = result.logs[i];
        if (log.event == "Transfer")
          foundEvent = true;
      }
      assert.equal(foundEvent, true, "method transfer() EXCEPTION: Transfer event not found.");
      return meta.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return meta.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "method transfer() EXCEPTION: Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "method transfer() EXCEPTION: Amount wasn't correctly sent to the receiver");
    }).catch(function(e) {
      console.log(e);
    });
  });

  it("should mintCoin corectly", function() {
    var meta;
    var account_one = accounts[0];
    var initBalance;
    var amount = 1500;

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.balanceOf.call(account_one);
    }).then(function(balance) {
      initBalance = balance.toNumber();
      return meta.mintToken(account_one, amount);
    }).then(function(result) {
      var foundEvent = false;
      for (var i = 0; i < result.logs.length; i++)
      {
        var log = result.logs[i];
        if (log.event == "Transfer")
          foundEvent = true;
      }
      assert.equal(foundEvent, true, "method mintToken() EXCEPTION: Transfer event not found.");
      return meta.balanceOf.call(account_one);
    }).then(function(balance) {
      var newBalance = balance.toNumber();
      assert.equal(newBalance, initBalance + amount, "method mintToken() EXCEPTION: The new minted Total does not match.");
    }).catch(function(e) {
      console.log(e);
    });
  });

  it("should freezeAccount() corectly", function() {
    var meta;
    var account_one = accounts[0];
    var account_two = accounts[1];

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.freezeAccount(account_two, true);
    }).then(function(result) {
      var foundEvent = false;
      for (var i = 0; i < result.logs.length; i++)
      {
        var log = result.logs[i];
        if (log.event == "FrozenFund")
          foundEvent = true;
      }
      assert.equal(foundEvent, true, "method freezeAccount() EXCEPTION: FrozenFund event not found.");
      return meta.isFrozenAccount.call(account_two);
    }).then(function(success) {
      var isAccountFrozen = success;
      assert.equal(isAccountFrozen, true, "method freezeAccount() EXCEPTION: Error while freezing an account.");
      return meta.freezeAccount(account_two, false);
    }).then(function(result) {
      var foundEvent = false;
      for (var i = 0; i < result.logs.length; i++)
      {
        var log = result.logs[i];
        if (log.event == "FrozenFund")
          foundEvent = true;
      }
      assert.equal(foundEvent, true, "method freezeAccount() EXCEPTION: FrozenFund event not found.");
      return meta.isFrozenAccount.call(account_two);
    }).then(function(success) {
      var isAccountFrozen = success;
      assert.equal(isAccountFrozen, false, "method freezeAccount() EXCEPTION: Error while unfreezing an account.");
      return meta.freezeAccount(account_two, false);
    }).catch(function(e) {
      console.log(e);
    });
  });

  it("should buy and sell metacoin corectly", function() {
    var meta;
    var account_one = accounts[0];
    var account_two = accounts[1];
    var address_this;
    var init_transfer = 500000000000;
    var amount = 2000000000;
    var tokenCount1;
    var tokenCount2;

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      address_this = instance.address;
      return meta.setPrices(1900000000, 2000000000);
    }).then(function(result) {
      return meta.balanceOf.call(account_two)
    }).then(function(balance) {
      tokenCount1 = balance.toNumber();
      return meta.transfer(address_this, 500000000000)
    }).then(function(balance) {
      return meta.buy({from: account_two, value: web3.toWei(1, "ether")});
      // return meta.buy({from: account_two, value: web3.fromWei(1, "ether")});
    }).then(function(result) {
      return meta.balanceOf.call(account_two);
    }).then(function(balance) {
      tokenCount2 = balance.toNumber();
      assert.equal(amount, tokenCount2 - tokenCount1, "the Token bought amount does not match.");
      amount = amount / 2;
      return meta.sell(amount, {from: account_two});
    }).then(function(result) {
      assert.equal(amount, tokenCount2 - tokenCount1 - amount, "the Token selling amount does not match.");
    }).catch(function(e) {
      console.log(e);
    });
  });

});
