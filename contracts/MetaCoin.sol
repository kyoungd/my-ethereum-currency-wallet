pragma solidity 0.4.11;

contract ERC20
{
     function totalSupply() constant returns (uint256 totalSupply);
     function balanceOf(address _owner) constant returns (uint256 balanceOf);
     function transfer(address _to, uint256 _value) returns (bool success);
     function transferFrom(address _from, address _to, uint256 _value) returns (bool success);
     function approve(address _spender, uint256 _value) returns (bool success);
     function allowance(address _owner, address _spender) constant returns (uint remaining);
     event Transfer(address indexed _from, address indexed _to, uint256 _value);
     event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

//
// admin: address of the administrator.  There can only be one administrator.
// onlyAdmin: Modifier to check for admin conidition
//
contract admined {
	address public admin;

	function admined(){
		admin = msg.sender;
	}

	modifier onlyAdmin(){
		// if(msg.sender != admin) assert(false);
		require(msg.sender == admin);
		_;
	}

	function transferAdminship(address newAdmin) onlyAdmin {
		admin = newAdmin;
	}

}

contract TBasic is ERC20 {

	mapping (address => uint256) _balanceOf;
	mapping (address => mapping (address => uint256)) _allowance;
	// _balanceOf[address] = 5;
	string standard = "TBasic v1.0";
	string public name;
	string public symbol;
	uint8  public decimal;
	uint256 _totalSupply;
	event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

	function TBasic(uint256 initialSupply, string tokenName, string tokenSymbol, uint8 decimalUnits){
		_balanceOf[msg.sender] = initialSupply;
		_totalSupply = initialSupply;
		decimal = decimalUnits;
		symbol = tokenSymbol;
		name = tokenName;
	}

  function totalSupply() constant returns (uint256 totalSupply) {
     return _totalSupply;
  }

  // What is the balance of a particular account?
  function balanceOf(address _owner) constant returns (uint256 balanceOf) {
     return _balanceOf[_owner];
  }

  function transfer(address _to, uint256 _value) returns (bool success) {
		if(_balanceOf[msg.sender] < _value) return false;
		if(_balanceOf[_to] + _value < _balanceOf[_to]) return false;
		//if(admin)

		_balanceOf[msg.sender] -= _value;
		_balanceOf[_to] += _value;
		Transfer(msg.sender, _to, _value);
		return true;
	}

  // Allow _spender to withdraw from your account, multiple times, up to the _value amount.
  // If this function is called again it overwrites the current allowance with _value.
	function approve(address _spender, uint256 _value) returns (bool success){
		_allowance[msg.sender][_spender] = _value;
    Approval(msg.sender, _spender, _value);
		return true;
	}

  function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
    return _allowance[_owner][_spender];
  }

  // Send _value amount of tokens from address _from to address _to
  // The transferFrom method is used for a withdraw workflow, allowing contracts to send
  // tokens on your behalf, for example to "deposit" to a contract address and/or to charge
  // fees in sub-currencies; the command should fail unless the _from account has
  // deliberately authorized the sender of the message via some mechanism; we propose
  // these standardized APIs for approval:
  function transferFrom(address _from, address _to, uint256 _value) returns (bool success){
		if(_balanceOf[_from] < _value) return false;
		if(_balanceOf[_to] + _value < _balanceOf[_to]) return false;
		if(_value > _allowance[_from][msg.sender]) return false;
		require(_value <= _allowance[_from][msg.sender]);
		_balanceOf[_from] -= _value;
		_balanceOf[_to] += _value;
		_allowance[_from][msg.sender] -= _value;
		Transfer(_from, _to, _value);
		return true;
	}

}

contract TCoin is admined, TBasic{

	uint256 minimumBalanceForAccounts = 5 finney;
	uint256 sellPrice;
	uint256 buyPrice;
	mapping (address => bool) public frozenAccount;

	event FrozenFund(address target, bool frozen);

  modifier enforceMinimumBalance() {
	if(msg.sender.balance < minimumBalanceForAccounts)
	    sell((minimumBalanceForAccounts - msg.sender.balance)/sellPrice);
	_;
  }

  function getSellPrice() public constant returns (uint256) {
    return sellPrice;
  }

  function getBuyPrice() public constant returns (uint256) {
    return buyPrice;
  }

	function TCoin(uint256 initialSupply, string tokenName, string tokenSymbol, uint8 decimalUnits, address centralAdmin) TBasic (0, tokenName, tokenSymbol, decimalUnits ){
		_totalSupply = initialSupply;
		if(centralAdmin != 0)
			admin = centralAdmin;
		else
			admin = msg.sender;
		_balanceOf[admin] = initialSupply;
		_totalSupply = initialSupply;
	}

	function mintToken(address target, uint256 mintedAmount) onlyAdmin {
    require(mintedAmount > 0);
		_balanceOf[target] += mintedAmount;
		_totalSupply += mintedAmount;
		Transfer(0, this, mintedAmount);
		Transfer(this, target, mintedAmount);
	}

  function isFrozenAccount(address target) public constant returns (bool) {
    return frozenAccount[target];
  }

	function freezeAccount(address target, bool freeze) onlyAdmin {
	  require(target != admin);
    require(target != msg.sender);
		frozenAccount[target] = freeze;
		FrozenFund(target, freeze);
	}

	function transfer(address _to, uint256 _value) enforceMinimumBalance returns (bool success) {
    require(!frozenAccount[msg.sender]);
    return TBasic.transfer(_to, _value);
	}

	function transferFrom(address _from, address _to, uint256 _value) enforceMinimumBalance returns (bool success){
		//if(frozenAccount[_from]) ;
		require(!frozenAccount[_from]);
    require(!frozenAccount[msg.sender]);
		//if(_balanceOf[_from] < _value) ;
		return TBasic.transferFrom(_from, _to, _value);
	}

	function setPrices(uint256 newSellPrice, uint256 newBuyPrice) onlyAdmin {
		sellPrice = newSellPrice;
		buyPrice = newBuyPrice;
	}

  // buy Ether
  function buy() payable returns (bool success) {
		uint256 amount = (msg.value * buyPrice / (1 ether)) ;
		require(_balanceOf[this] >= amount);
		_balanceOf[msg.sender] += amount;
		_balanceOf[this] -= amount;
		Transfer(this, msg.sender, amount);
		return true;
	}

	function sell(uint256 amount) returns (bool success) {
		// if(_balanceOf[msg.sender] < amount) return false;
		require(_balanceOf[msg.sender] >= amount);
    require(!frozenAccount[msg.sender]);
		_balanceOf[this] +=amount;
		_balanceOf[msg.sender] -= amount;
    var etherAmount = amount * sellPrice / (1 ether);
		msg.sender.transfer(etherAmount);
		Transfer(msg.sender, this, amount);
    return true;
	}

	function giveBlockreward(){
		_balanceOf[block.coinbase] += 1;
	}

	bytes32 public currentChallenge;
	uint public timeOfLastProof;
	uint public difficulty = 10**32;

	function proofOfWork(uint nonce){
		bytes8 n = bytes8(sha3(nonce, currentChallenge));

		// if(n < bytes8(difficulty)) ;
		require(n >= bytes8(difficulty));
		uint timeSinceLastBlock = (now - timeOfLastProof);
		// if(timeSinceLastBlock < 5 seconds) ;
		require(timeSinceLastBlock < 5 seconds);

		_balanceOf[msg.sender] += timeSinceLastBlock / 60 seconds;
		difficulty = difficulty * 10 minutes / timeOfLastProof + 1;
		timeOfLastProof = now;
		currentChallenge = sha3(nonce, currentChallenge, block.blockhash(block.number-1));
 	}

}

contract MetaCoin is TCoin
{

    function MetaCoin() TCoin(10000000000000, "MetaCoin", "ENTK", 9, msg.sender) {
      TCoin.setPrices(1900000000, 2000000000);
    }

    function killme(uint passcode) onlyAdmin {
      require(passcode == 13971);
      selfdestruct(admin);
    }

}
