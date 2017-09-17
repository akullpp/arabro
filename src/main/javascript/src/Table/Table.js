import React from 'react'
import { arrayOf, string, node } from 'prop-types'

import './Table.css'

const Table = ({ headers, children }) =>
  <table>
    <thead className="numeral__table">
      <tr>
        {
          headers.map(header => <th key={header}>{header}</th>)
        }
      </tr>
    </thead>
    <tbody>
      { children }
    </tbody>
  </table>

Table.propTypes = {
  headers: arrayOf(string).isRequired,
  children: node,
}

export default Table
