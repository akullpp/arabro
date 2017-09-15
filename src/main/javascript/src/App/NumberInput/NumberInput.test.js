import React from 'react'
import { shallow } from 'enzyme'

import NumberInput from './NumberInput';

const setup = () => {
  const handleSubmit = jest.fn()
  const handleInput = jest.fn()

  const props = {
    placeholder: 'placeholder',
    value: 'value',
    handleSubmit,
    handleInput,
  }

  return {
    wrapper: shallow(<NumberInput {...props} />),
    handleSubmit,
    handleInput,
  }
}

describe('NumberInput Component', () => {
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

  test('should trigger handleSubmit function on submit change', () => {
    const { wrapper, handleSubmit } = setup()

    wrapper.find('form').simulate('submit')

    expect(handleSubmit.mock.calls.length).toBe(1)
  })
})
