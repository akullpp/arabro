import React from 'react'
import { shallow } from 'enzyme'

import App from './App';
import http from '../http'

const setup = () =>
  shallow(<App />)

describe('App Component', () => {
  test('should render', () => {
    const sut = setup()

    expect(sut.exists()).toBe(true)
  })

  test('should not render errors if none exist', () => {
    const sut = setup()

    const result = sut.find('Error')

    expect(result.exists()).toBe(false)
  })

  test('should render errors if errors exist', () => {
    const sut = setup()

    sut.setState({ errors: ['A', 'B', 'C'] })
    const result = sut.find('Error')

    expect(result.exists()).toBe(true)
  })

  test('should provide a default state', () => {
    const sut = setup()

    const result = sut.state()

    expect(result).toEqual({
      number: '',
      numerals: [],
      errors: [],
    })
  })

  test('should reset errors on input change and set the correct state property', () => {
    const sut = setup().instance()
    sut.setState({ errors: ['A', 'B', 'C'] })
    expect(sut.state.errors.length).toBe(3)

    sut.handleInput({ target: { value: 'Test' } })

    expect(sut.state.errors.length).toBe(0)
    expect(sut.state.number).toBe('Test')
  })

  describe('isValidRange', () => {
    test('should return false for numbers out of range', () => {
      const invalid = [-1, 0, 4000]
      const sut = setup().instance().isValidRange

      invalid.forEach((value) => {
        const result = sut(value)

        expect(result).toBe(false)
      })
    })

    test('should return true for numbers in range', () => {
      const valid = [1, 3999]
      const sut = setup().instance().isValidRange

      valid.forEach((value) => {
        const result = sut(value)

        expect(result).toBe(true)
      })
    })
  })

  describe('isDuplicate', () => {
    test('should return false if arabic number is in array', () => {
      const sut = setup().instance().isDuplicate
      const numerals = [
        { arabic: 1 },
        { arabic: 2 },
        { arabic: 3 },
      ]

      const result = sut(numerals, 2)

      expect(result).toBe(true)
    })

    test('should return true if arabic number is not in array', () => {
      const sut = setup().instance().isDuplicate
      const numerals = [
        { arabic: 1 },
        { arabic: 2 },
        { arabic: 3 },
      ]

      const result = sut(numerals, 4)

      expect(result).toBe(false)
    })
  })

  describe('handleSubmit', () => {
    test('should return if number is falsy', () => {
      const invalid = [null, undefined, '']
      const sut = setup().instance()

      invalid.forEach((value) => {
        sut.setState({ number: value })

        const result = sut.handleSubmit({ preventDefault: jest.fn() })

        expect(result).toBe(undefined)
      })
    })

    test('should set an error message if number is not in range', () => {
      const sut = setup().instance()
      sut.setState({ number: '0' })

      sut.handleSubmit({ preventDefault: jest.fn() })
      const result = sut.state.errors

      expect(result).toContain('Number must be in range of 1 and 3999')
    })

    test('should set an error message if number was already converted', () => {
      const sut = setup().instance()
      sut.setState({
        number: '1',
        numerals: [{ arabic: 1, roman: 'I', isPrime: false }],
      })

      sut.handleSubmit({ preventDefault: jest.fn() })
      const result = sut.state.errors

      expect(result).toContain('Number already included')
    })

    test('should trigger a POST request', () => {
      const sut = setup().instance()
      http.post = jest.fn().mockReturnValue({
        then: () => {},
      })
      sut.setState({
        number: '1',
        numerals: [],
      })

      sut.handleSubmit({ preventDefault: jest.fn() })

      expect(http.post).toBeCalled()
    })

    test('should trigger a POST request', () => {
      const sut = setup().instance()
      http.post = jest.fn().mockReturnValue({
        then: () => {},
      })
      sut.setState({
        number: '1',
        numerals: [],
      })

      sut.handleSubmit({ preventDefault: jest.fn() })

      expect(http.post).toBeCalled()
    })

    test('should set the new numeral at the beginning of the list and clear the number', () => {
      const sut = setup().instance()
      const expected = [
        { arabic: 2, roman: 'II', isPrime: true },
        { arabic: 1, roman: 'I', isPrime: false },
      ]
      http.post = jest.fn().mockReturnValue({
        then: fn => fn(expected[0]),
      })
      sut.setState({
        number: '2',
        numerals: [expected[1]],
      })

      sut.handleSubmit({ preventDefault: jest.fn() })
      const result = sut.state

      expect(result.numerals).toEqual(expected)
      expect(result.number).toEqual('')
    })
  })
})
