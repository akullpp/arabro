import React from 'react'
import { shallow } from 'enzyme'

import NumeralTable from './NumeralTable';

const setup = () => {
  const numerals = [
    { arabic: 1, roman: 'I', isPrime: false },
    { arabic: 2, roman: 'II', isPrime: true },
    { arabic: 3, roman: 'III', isPrime: true },
  ]

  return shallow(<NumeralTable numerals={numerals} />)
}

describe('NumeralTable Component', () => {
  test('should render', () => {
    const sut = setup()

    expect(sut.exists()).toBe(true)
  })

  test('should render one row for each numeral', () => {
    const sut = setup()

    const result = sut.find('tbody').children().length

    expect(result).toBe(3)
  })
})
