import prepareResponseError, { getErrorFromResponse } from './prepareResponseError'

describe('models: helpers', () => {
  describe('getErrorFromResponse', () => {
    it('should get error from response data', () => {
      const error = { response: { data: 'fake response data' } }
      expect(getErrorFromResponse(error)).toBe('fake response data')
    })

    it('should get error message from Error instance (possibly network error from axios)', () => {
      const error = new Error('something failed')
      expect(getErrorFromResponse(error)).toBe('something failed')
    })

    it('should return null if no error was found', () => {
      expect(getErrorFromResponse({ response: { status: 123 } })).toBe(null)
      expect(getErrorFromResponse({ response: null })).toBe(null)
      expect(getErrorFromResponse({})).toBe(null)
      expect(getErrorFromResponse()).toBe(null)
    })
  })

  describe('prepareResponseError', () => {
    it('should update error message', () => {
      const error = new Error('initial error message')
      error.response = { data: 'response error' }
      expect(prepareResponseError(error).message).toBe('response error')
    })

    it('should work for empty errors', () => {
      const error = undefined
      expect(prepareResponseError(error).message).toBe(null)
    })
  })
})
