import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

function renderAlert(errorMessage){
  if (errorMessage) {
    return (
      <div className="alert alert-danger">
        <strong>Oops!</strong> {errorMessage}
      </div>
    )
  }
}

export const account = (props) => {
  console.log(props);
  return (
    <main className="container">
      <div className="pure-g">
        <div className="pure-u-1-1">
          <h1>{props.location.query.text}</h1>
          <br/>
          <fieldset className='form-group'>
            <label>Contract Address : { props.account.addressContract } </label>;
          </fieldset>
          <fieldset className='form-group'>
            <label>Contract Address : { props.account.addressContract } </label>;
          </fieldset>
          <fieldset className='form-group'>
            <label>MetaCoin: </label>;
          </fieldset>
          <fieldset className='form-group'>
            <label>Ether: </label>;
          </fieldset>
          <fieldset className='form-group'>
            <label>Allowance: </label>;
          </fieldset>
          { renderAlert(props.errorMessage) }
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>> mapStateToProps: ');
  console.log(state);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>> mapStateToProps: ');
  return { account: state.auth, }
}

export const Account = connect(
  mapStateToProps,
  null,
)(account)
