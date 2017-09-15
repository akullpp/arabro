import React from 'react'
import { arrayOf, string } from 'prop-types'

import './Error.css'

const Error = ({ messages }) =>
  <div className="error__wrapper">
    { messages.map(message =>
      <div key={message}>
        <span>{message}</span>
      </div>)
    }
  </div>

Error.propTypes = {
  messages: arrayOf(string),
}
export default Error
