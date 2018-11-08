import messages from './messages'

describe('Rematch: messages model', () => {
  describe('reducers', () => {
    describe('showMessage', () => {
      it('should update params and open the message', () => {
        const prevState = { ...messages.state }
        const nextState = messages.reducers.showMessage(prevState, {
          autoHideDuration: 123,
          message: 'fake message',
          type: 'error',
        })

        expect(nextState).toEqual({
          ...prevState,
          autoHideDuration: 123,
          message: 'fake message',
          type: 'error',
          isOpen: true,
        })
      })

      it('should use default autoHideDuration if none provided', () => {
        const prevState = { ...messages.state }
        const nextState = messages.reducers.showMessage(prevState, {
          message: 'fake message',
          type: 'error',
        })

        expect(nextState.autoHideDuration).toBe(5000)
      })
    })

    describe('hideMessage', () => {
      it('should clear params and close the message', () => {
        const prevState = { ...messages.state }
        const nextState = messages.reducers.hideMessage(prevState)

        expect(nextState).toEqual({
          ...prevState,
          autoHideDuration: 0,
          message: null,
          type: null,
          isOpen: false,
        })
      })
    })
  })
})
