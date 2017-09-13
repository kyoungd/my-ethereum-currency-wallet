import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { renderField } from '../utils/tool';

class transfer extends Component {

  handleFormSubmit({addressTo, amount}) {
    // Need to do something to execute the transfer Fund operation.
    switch (this.props.location.query.id) {
      case 'transferTo' :
        this.props.transferFund({addressTo, amount});
        break;
      case 'giveAllowance' :
        this.props.giveAllowance({addressTo, amount});
        break;
      default:
        this.props.authError("components.transfer.handleSubmit.  Unknown id type. ", this.props.location.query.id);
        break;
    }
  }
  componentWillMount() {
    // var addrFrom = document.getElementById('fsAddressFrom');
    // console.log('componentWillAmount(addrFrom): ', addrFrom);
    // addrFrom.classList.add('hide');
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <br/>
              <h1>{this.props.location.query.text}</h1>
              <fieldset className='form-group'>
                <label>Address To: </label>;
                <Field name='addressTo' component={renderField} type='text' className='form-control' />
              </fieldset>
              <fieldset className='form-group'>
                <label>Amount: </label>;
                <Field name='amount' component={renderField} type='text' className='form-control' />
              </fieldset>
              { this.renderAlert(this.props.account.errorMessage) }
              <button action="submit" className="btn btn-primary">{ this.props.location.query.text }</button>
              <label id="errorMsg"></label>
            </form>
          </div>
        </div>
      </main>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.addressTo) {
    errors.addressTo = 'Required'
  } else if (values.addressTo.length < 15) {
    errors.addressTo = 'Must be 15 characters or less'
  }
  if (!values.amount) {
    errors.amount = 'Required'
  } else if (isNaN(Number(values.amount))) {
    errors.amount = 'Must be a number'
  } else if (Number(values.amount) < 1) {
    errors.amount = 'Sorry, you cannot transfer 0 or negative amount.'
  }
  return errors
}

const warn = values => {
  const warnings = {}
  if (values.amount < 100) {
    warnings.amount = 'Amount transfer seems low.  Please verify.'
  }
  return warnings
}

function mapStateToProps(state) {
  console.log('>>>>>>>>>>>>>> mapStateToProps')
  console.log(state);
  return { account: state.auth };
}

var Transfer = connect(mapStateToProps, actions)(transfer);

export default reduxForm ({
  form: 'transfer',
  validate,
  warn
})(Transfer);
