import React from 'react'
import { shape, number, string, bool } from 'prop-types'

import './Numeral.css'

const Numeral = ({ numeral: { arabic, roman, isPrime } }) =>
  <tr className={isPrime && 'numeral--prime'}>
    <td>{arabic}</td>
    <td>{roman}</td>
  </tr>

Numeral.propTypes = {
  numeral: shape({
    arabic: number.isRequired,
    roman: string.isRequired,
    isPrime: bool.isRequired,
  }),
}
export default Numeral
