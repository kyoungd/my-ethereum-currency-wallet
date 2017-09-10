import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { renderField } from '../utils/tool';

class Transfer extends Component {
  constructor(props) {
    super(props);
    console.log('Transfer constructor props: ', props);
  }
  handleFormSubmit({addressTo, amount}) {
    // Need to do something to execute the Transfer Fund operation.
    this.props.transferFund({addressTo, amount});
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <br/>
              <fieldset className='form-group'>
                <label>Address To: </label>;
                <Field name='addressTo' component={renderField} type='text' className='form-control' />
              </fieldset>
              <fieldset className='form-group'>
                <label>Amount: </label>;
                <Field name='amount' component={renderField} type='text' className='form-control' />
              </fieldset>
              { this.renderAlert() }
              <button action="submit" className="btn btn-primary">Transfer Fund</button>
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
  return { errorMessage: state.auth.errorMessage };
}

Transfer = connect(mapStateToProps, actions)(Transfer);

export default reduxForm ({
  form: 'transfer',
  validate,
  warn
})(Transfer);
