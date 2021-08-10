import React from 'react';
import PropTypes from 'prop-types';
import './Checkout.scss'

const AddressForm = ({ handleChange }) => (
  <form>
    <label htmlFor="st">
      <div>Rua:</div>
      <input
        data-testid="checkout-street-input"
        type="text"
        id="st"
        onChange={ (e) => handleChange('st', e) }
      />
    </label>
    <label htmlFor="numero">
      <div>Número da casa:</div>
      <input
        data-testid="checkout-house-number-input"
        type="text"
        id="numero"
        onChange={ (e) => handleChange('num', e) }
      />
    </label>
  </form>
);

AddressForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default AddressForm;
