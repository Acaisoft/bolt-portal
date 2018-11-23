import Rematch from '~services/Rematch'

import handleGlobalHttpError from './handleGlobalHttpError'

jest.mock('~services/Rematch', () => ({
  dispatch: {
    messages: {
      showMessage: jest.fn(),
    },
  },
}))

describe('models: helpers', () => {
  describe('handleGlobalHttpError', () => {
    beforeEach(() => {
      Rematch.dispatch.messages.showMessage.mockClear()
    })

    it('should display global message if response was undefined (network error from axios)', () => {
      const error = new Error('Network error')
      error.response = undefined

      handleGlobalHttpError(error)
      expect(Rematch.dispatch.messages.showMessage).toHaveBeenCalledWith({
        type: 'error',
        message: 'Network error',
      })
    })

    it('should not display global message otherwise', () => {
      let error = new Error('Network error')
      error.response = { data: 'some response data' }

      handleGlobalHttpError(error)
      expect(Rematch.dispatch.messages.showMessage).not.toHaveBeenCalled()

      error = {}
      handleGlobalHttpError(error)
      expect(Rematch.dispatch.messages.showMessage).not.toHaveBeenCalled()

      error = undefined
      handleGlobalHttpError(error)
      expect(Rematch.dispatch.messages.showMessage).not.toHaveBeenCalled()
    })
  })
})
