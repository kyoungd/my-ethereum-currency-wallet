import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderAlert, renderField } from '../utils/tool';
import * as actions from '../actions';
import { connect } from 'react-redux';

class buySellPrice extends Component {
  submitForm({buyPrice, sellPrice}) {
    this.props.buySellPrice({buyPrice, sellPrice});
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
              <h1>{this.props.location.query.text}</h1>
              <br/>
              <fieldset className='form-group'>
                <label>Buy Price: </label>;
                <Field name='buyPrice' component={renderField} type='text' className='form-control' />
              </fieldset>
              <fieldset className='form-group'>
                <label>Sell Price: </label>;
                <Field name='sellPrice' component={renderField} type='text' className='form-control' />
              </fieldset>
              { renderAlert(this.props.account.errorMessage) }
              <button action="submit" className="btn btn-primary">{this.props.location.query.text}</button>
              <label id="errorMsg"></label>
            </form>
          </div>
        </div>
      </main>
    )
  }
}

function mapStateToProps(state, action) {
  return { account : state.auth }
}

var BuySellPrice = connect(mapStateToProps, actions)(buySellPrice);

export default reduxForm ({
  form: 'buySellPriceForm'
})(BuySellPrice);
