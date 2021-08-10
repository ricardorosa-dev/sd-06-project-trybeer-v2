import React from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';

const Checkbox = ({ isSeller, setIsSeller }) => (
  <label className="checkbox-label" htmlFor="check">
    Quero vender
    <input
      className="checkbox"
      type="checkbox"
      data-testid="signup-seller"
      checked={ isSeller }
      onChange={ () => setIsSeller(!isSeller) }
      id="check"
    />
  </label>
);

Checkbox.propTypes = {
  isSeller: PropTypes.bool.isRequired,
  setIsSeller: PropTypes.func.isRequired,
};

export default Checkbox;
