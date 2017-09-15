import React from 'react'
import { arrayOf, shape, number, string, bool } from 'prop-types'

import './NumeralTable.css'
import Numeral from '../Numeral'

const NumeralTable = ({ numerals }) =>
  <table>
    <thead className="numeral__table">
      <tr>
        <th>Arabic</th>
        <th>Roman</th>
      </tr>
    </thead>
    <tbody>
      {
        numerals.map(numeral =>
          <Numeral
            key={numeral.arabic}
            numeral={numeral}
          />)
      }
    </tbody>
  </table>

NumeralTable.propTypes = {
  numerals: arrayOf(shape({
    arabic: number.isRequired,
    roman: string.isRequired,
    isPrime: bool.isRequired,
  })),
}

export default NumeralTable
