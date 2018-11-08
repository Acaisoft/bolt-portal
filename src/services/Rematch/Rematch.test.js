import Rematch from './Rematch'

describe('Rematch', () => {
  it('should export an instance of the Redux store', () => {
    expect(Rematch).toMatchObject({
      dispatch: expect.any(Function),
      getState: expect.any(Function),
    })
  })
})
