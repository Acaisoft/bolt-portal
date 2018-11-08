import Rematch from '~services/Rematch'

import {
  getErrorFromResponse,
  globalHttpErrorHandler,
  prepareResponseError,
} from './errors'

jest.mock('~services/Rematch', () => ({
  dispatch: {
    messages: {
      showMessage: jest.fn(),
    },
  },
}))

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

  describe('globalHttpErrorHandler', () => {
    beforeEach(() => {
      Rematch.dispatch.messages.showMessage.mockClear()
    })

    it('should display global message if response was undefined (network error from axios)', () => {
      const error = new Error('Network error')
      error.response = undefined

      globalHttpErrorHandler(error)
      expect(Rematch.dispatch.messages.showMessage).toHaveBeenCalledWith({
        type: 'error',
        message: 'Network error',
      })
    })

    it('should not display global message otherwise', () => {
      let error = new Error('Network error')
      error.response = { data: 'some response data' }

      globalHttpErrorHandler(error)
      expect(Rematch.dispatch.messages.showMessage).not.toHaveBeenCalled()

      error = {}
      globalHttpErrorHandler(error)
      expect(Rematch.dispatch.messages.showMessage).not.toHaveBeenCalled()

      error = undefined
      globalHttpErrorHandler(error)
      expect(Rematch.dispatch.messages.showMessage).not.toHaveBeenCalled()
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
