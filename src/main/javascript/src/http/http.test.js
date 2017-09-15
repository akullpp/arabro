import http from './http';

describe('http', () => {
  test('should expose a POST function', () => {
    const result = http.post

    expect(result).toBeInstanceOf(Function)
  })

  describe('post', () => {
    const setup = (customPromise) => {
      const promise = customPromise || Promise.resolve({ json: jest.fn() })
      global.fetch = jest.fn().mockReturnValue(promise)
    }

    test('should pass the URL to fetch', () => {
      setup()

      http.post('URL')
      const calls = global.fetch.mock.calls
      const result = calls[calls.length - 1][0]

      expect(result).toBe('URL')
    })

    test('should set the method to POST', () => {
      setup()

      http.post('URL')
      const calls = global.fetch.mock.calls
      const result = calls[calls.length - 1][1].method

      expect(result).toBe('POST')
    })

    test('should set the content type to JSON', () => {
      setup()

      http.post('URL')
      const calls = global.fetch.mock.calls
      const result = calls[calls.length - 1][1].headers['Content-Type']

      expect(result).toBe('application/json;charset=UTF-8')
    })

    test('should stringify the body', () => {
      setup()
      const payload = { test: 123 }

      http.post('URL', payload)
      const calls = global.fetch.mock.calls
      const result = calls[calls.length - 1][1].body

      expect(result).toBe(JSON.stringify(payload))
    })

    test('should stringify the body', () => {
      setup()
      const payload = { test: 123 }

      http.post('URL', payload)
      const calls = global.fetch.mock.calls
      const result = calls[calls.length - 1][1].body

      expect(result).toBe(JSON.stringify(payload))
    })

    test('should call the json function if successful', () => {
      const json = jest.fn()
      setup(Promise.resolve({ json }))

      return http.post('URL', {})
        .then(() => expect(json).toBeCalled())
    })

    test('should log the error response', () => {
      global.console.log = jest.fn()
      setup(Promise.reject('Test'))

      return http.post('URL', {})
        .catch(() => expect(global.console.log).toBeCalledWith('Test'))
    })
  })
})
