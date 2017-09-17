import React from 'react'
import { shallow } from 'enzyme'

import Input from './Input';

const setup = () => {
  const handleInput = jest.fn()

  const props = {
    placeholder: 'placeholder',
    value: 'value',
    handleInput,
  }

  return {
    wrapper: shallow(<Input {...props} />),
    handleInput,
  }
}

describe('Input Component', () => {
  test('should render', () => {
    const { wrapper } = setup()

    expect(wrapper.exists()).toBe(true)
  })

  test('should allow a custom placeholder', () => {
    const { wrapper } = setup()

    const result = wrapper.instance().props.placeholder

    expect(result).toBe('placeholder')
  })

  test('should allow a custom value', () => {
    const { wrapper } = setup()

    const result = wrapper.instance().props.value

    expect(result).toBe('value')
  })

  test('should trigger handleInput function on input change', () => {
    const { wrapper, handleInput } = setup()

    wrapper.find('input').simulate('change', { target: { value: 'text' } })

    expect(handleInput.mock.calls.length).toBe(1)
  })
})
