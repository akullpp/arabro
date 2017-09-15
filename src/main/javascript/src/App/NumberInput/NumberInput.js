import React from 'react'
import { func, string } from 'prop-types'

import './NumberInput.css';

const NumberInput = ({ handleSubmit, placeholder, value, handleInput }) =>
  <form onSubmit={handleSubmit}>
    <input
      className="number__input"
      placeholder={placeholder}
      type="number"
      value={value}
      onChange={handleInput}
    />
  </form>

NumberInput.propTypes = {
  handleSubmit: func.isRequired,
  placeholder: string,
  value: string,
  handleInput: func.isRequired,
}

NumberInput.defaultProps = {
  placeholder: 'Please provide a number',
  value: '',
}

export default NumberInput
