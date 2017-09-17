import React from 'react'
import { shallow } from 'enzyme'

import Table from './Table';

const setup = () => {
  const headers = [
    'A',
    'B',
    'C',
  ]

  return shallow(
    <Table headers={headers} />)
}

describe('Table Component', () => {
  test('should render', () => {
    const sut = setup()

    expect(sut.exists()).toBe(true)
  })

  test('should render the headers', () => {
    const sut = setup()

    const result = sut.find('th').children().length

    expect(result).toBe(3)
  })
})
