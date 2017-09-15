import React from 'react'
import { shallow } from 'enzyme'

import Numeral from './Numeral';

const setup = (customNumeral) => {
  const numeral = Object.assign({
    arabic: 9000,
    roman: 'IX',
    isPrime: false,
  }, customNumeral)

  return shallow(<Numeral numeral={numeral} />)
}

describe('Numeral Component', () => {
  test('should render', () => {
    const sut = setup()

    expect(sut.exists()).toBe(true)
  })

  test('should render two columns', () => {
    const sut = setup()

    const result = sut.find('td')

    expect(result.length).toBe(2)
  })

  test('should render Arabic number in the first column', () => {
    const sut = setup()

    const result = sut.find('td').at(0).text()

    expect(result).toBe('9000')
  })

  test('should render Roman number in the second column', () => {
    const sut = setup()

    const result = sut.find('td').at(1).text()

    expect(result).toBe('IX')
  })

  test('should attach the class if isPrime is true', () => {
    const sut = setup({ isPrime: true })

    const result = sut.find('tr').hasClass('numeral--prime')

    expect(result).toBe(true)
  })

  test('should not attach the class if isPrime is false', () => {
    const sut = setup()

    const result = sut.find('tr').hasClass('numeral--prime')

    expect(result).toBe(false)
  })
})
