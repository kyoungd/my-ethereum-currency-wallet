import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { renderField } from '../utils/tool';

class BuySellMint extends Component {
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }
  handleFormSubmit({amount}) {
    // Need to do something to execute the BuySellMint Fund operation.
    console.log('>>>>>>>>>>>>> handleFormSubmit(): ', this.props);
    switch(this.props.location.query.id) {
      case 'buyToken':
        this.props.buyTokens({amount});
        break;
      case 'sellToken':
        this.props.sellTokens({amount});
        break;
      case 'mintToken':
        this.props.mintTokens({amount});
        break;
      default:
        break;
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <h1>{this.props.location.query.text}</h1>
              <br/>
              <fieldset className='form-group'>
                <label>Amount: </label>;
                <Field name='amount' component={renderField} type='text' className='form-control' />
              </fieldset>
              { this.renderAlert() }
              <button action="submit" className="btn btn-primary">{this.props.location.query.text}</button>
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

BuySellMint = connect(mapStateToProps, actions)(BuySellMint);

export default reduxForm ({
  form: 'buySellMintForm',
  validate,
  warn
})(BuySellMint);
