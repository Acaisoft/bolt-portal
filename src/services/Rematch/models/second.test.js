import Http from '~services/Http'

import second from './second'
import { mockResponse } from './second.test.mocks'

jest.mock('~services/Http')

describe('Rematch: second model', () => {
  describe('reducers', () => {
    describe('setAnotherThing', () => {
      it('should update anotherThing', () => {
        const prevState = { ...second.state }
        const nextState = second.reducers.setAnotherThing(prevState, 'fake value')

        expect(nextState).toEqual({
          ...prevState,
          anotherThing: 'fake value',
        })
      })
    })
  })

  describe('effects', () => {
    describe('fetchAnotherThing', () => {
      let fakeThis
      let fakeDispatch
      let secondEffects

      beforeEach(() => {
        fakeThis = {
          setAnotherThing: jest.fn(),
        }
        fakeDispatch = {
          first: {
            setSomething: jest.fn(),
          },
        }
        secondEffects = second.effects(fakeDispatch)
      })

      it('should fetch data from /second-endpoint', async () => {
        Http.get.mockResolvedValueOnce(mockResponse.fetchAnotherThing)

        await secondEffects.fetchAnotherThing.call(fakeThis)

        expect(Http.get).toHaveBeenCalledWith('/second-endpoint')
      })

      it('should set anotherThing on success', async () => {
        Http.get.mockResolvedValueOnce(mockResponse.fetchAnotherThing)

        await secondEffects.fetchAnotherThing.call(fakeThis)

        expect(fakeThis.setAnotherThing).toHaveBeenCalledWith(
          mockResponse.fetchAnotherThing.data.anotherThing
        )
      })

      it('should set something in first model', async () => {
        Http.get.mockResolvedValueOnce(mockResponse.fetchAnotherThing)

        await secondEffects.fetchAnotherThing.call(fakeThis)

        expect(fakeDispatch.first.setSomething).toHaveBeenCalledWith(
          mockResponse.fetchAnotherThing.data.something
        )
      })

      it('should reset anotherThing on error', async () => {
        Http.get.mockRejectedValueOnce(new Error('fake error response body'))

        try {
          await secondEffects.fetchAnotherThing.call(fakeThis)
        } catch (preparedEx) {
          expect(fakeThis.setAnotherThing).toHaveBeenCalledWith(null)
          expect(preparedEx.message).toBe('fake error response body')
        }
      })
    })
  })
})
