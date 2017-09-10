import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav className="pure-menu-heading pure-menu-link">
        <ul className="nav navbar-nav">
          <li className="nav nav-item"><a href="/">Home</a></li>
          <li className="nav nav-item"><a href="transfer?id=transferTo&amp;text=Transfer%20Fund">Transfer</a></li>
          <li className="nav nav-item"><a href="transfer?id=giveAllowance&amp;text=Give%20Allowance">Allowance</a></li>
          <li className="nav nav-item"><a href="spendAllowance">Spend Allowance</a></li>
          <li className="nav nav-item">Buy</li>
          <li className="nav nav-item">Sell</li>
          <li className="nav nav-item">Buy/Sell Price</li>
          <li className="nav nav-item">Mint Coin</li>
          <li className="nav nav-item">Freeze/Unfreeze</li>
        </ul>
      </nav>
    );
  }
}

export default Header;
