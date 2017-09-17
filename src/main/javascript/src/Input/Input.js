import React from 'react'
import { func, string } from 'prop-types'

import './Input.css'

const Input = ({ placeholder, value, handleInput, type }) =>
  <input
    className="input"
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={handleInput}
  />

Input.propTypes = {
  placeholder: string,
  value: string,
  type: string,
  handleInput: func.isRequired,
}

Input.defaultProps = {
  placeholder: 'Please provide an input',
  value: '',
}

export default Input
