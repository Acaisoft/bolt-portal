import Http from '~services/Http'

import first from './first'
import { mockResponse } from './first.test.mocks'

jest.mock('~services/Http')

describe('Rematch: first model', () => {
  describe('reducers', () => {
    describe('setSomething', () => {
      it('should update something', () => {
        const prevState = { ...first.state }
        const nextState = first.reducers.setSomething(prevState, 'fake value')

        expect(nextState).toEqual({
          ...prevState,
          something: 'fake value',
        })
      })
    })
  })

  describe('effects', () => {
    describe('fetchSomething', () => {
      let fakeThis

      beforeEach(() => {
        fakeThis = {
          setSomething: jest.fn(),
        }
      })

      it('should fetch data from /first-endpoint', async () => {
        Http.get.mockResolvedValueOnce(mockResponse.fetchSomething)

        await first.effects.fetchSomething.call(fakeThis)

        expect(Http.get).toHaveBeenCalledWith('/first-endpoint')
      })

      it('should set something on success', async () => {
        Http.get.mockResolvedValueOnce(mockResponse.fetchSomething)

        await first.effects.fetchSomething.call(fakeThis)

        expect(fakeThis.setSomething).toHaveBeenCalledWith(
          mockResponse.fetchSomething.data
        )
      })

      it('should reset something on error', async () => {
        Http.get.mockRejectedValueOnce(new Error('fake error response body'))

        try {
          await first.effects.fetchSomething.call(fakeThis)
        } catch (preparedEx) {
          expect(fakeThis.setSomething).toHaveBeenCalledWith(null)
          expect(preparedEx.message).toBe('fake error response body')
        }
      })
    })
  })
})
