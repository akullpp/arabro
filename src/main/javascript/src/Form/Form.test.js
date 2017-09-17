import React from 'react'
import { shallow } from 'enzyme'

import Form from './Form';

const setup = () => {
  const handleSubmit = jest.fn()

  const props = {
    handleSubmit,
  }

  return {
    wrapper: shallow(<Form {...props}><foo /></Form>),
    handleSubmit,
  }
}

describe('Form Component', () => {
  test('should render', () => {
    const { wrapper } = setup()

    expect(wrapper.exists()).toBe(true)
  })

  test('should trigger handleSubmit function on submit change', () => {
    const { wrapper, handleSubmit } = setup()

    wrapper.find('form').simulate('submit')

    expect(handleSubmit.mock.calls.length).toBe(1)
  })
})
