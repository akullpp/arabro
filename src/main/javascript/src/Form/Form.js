import React from 'react'
import { func, node } from 'prop-types'

const Form = ({ handleSubmit, children }) =>
  <form onSubmit={handleSubmit}>
    {children}
  </form>

Form.propTypes = {
  handleSubmit: func.isRequired,
  children: node.isRequired,
}

export default Form
