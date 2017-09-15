import React from 'react'
import { shallow } from 'enzyme'

import Error from './Error';

const setup = () => {
  const errors = [
    'A',
    'B',
    'C',
  ]

  return shallow(<Error messages={errors} />)
}

describe('Error Component', () => {
  test('should render', () => {
    const sut = setup()

    expect(sut.exists()).toBe(true)
  })

  test('should render each error', () => {
    const sut = setup()

    const result = sut.find('span').children().length

    expect(result).toBe(3)
  })
})
