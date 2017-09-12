import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import { Link } from 'react-router';
import * as actions from './actions';
import { connect } from 'react-redux';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import Header from './components/header';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      addressMe: '',
      addressContract: '',
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        this.setState({ addressMe: accounts[0], addressContract:simpleStorageInstance.address });
      //   // Stores a given value, 5 by default.
      //   return simpleStorageInstance.set(5, {from: accounts[0]})
      // }).then((result) => {
      //   // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        this.setState({ storageValue: result.c[0] });
        const { web3, addressMe, addressContract } = this.state;
        this.props.getMyWeb3({web3, addressMe, addressContract});
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        { this.props.children }
      </div>
    );
  }
}

App = connect(null, actions)(App);
export default App;
