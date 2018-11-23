import Http from './Http'

jest.mock('~services/Config', () => ({
  apiUrl: 'fake api url',
}))

jest.mock('./handlers', () => ({
  handleGlobalHttpError: jest.fn(),
}))

describe('service: Http', () => {
  describe('configuration', () => {
    it('should allow using REST methods', () => {
      expect(Object.keys(Http)).toEqual(
        expect.arrayContaining(['get', 'post', 'patch', 'put', 'options', 'delete'])
      )
    })

    it('should use base API url from Config service', () => {
      expect(Http._axios.defaults.baseURL).toBe('fake api url')
    })

    describe('interceptors', () => {
      describe('response', () => {
        const responseHandlers = Http._axios.interceptors.response.handlers
        it('should return the reponse on success', () => {
          expect(responseHandlers[0].fulfilled('fake response')).toBe(
            'fake response'
          )
        })

        it('should reject the promise of response on error', async () => {
          try {
            await responseHandlers[0].rejected(new Error('fake error'))
          } catch (err) {
            expect(err.message).toBe('fake error')
          }
        })
      })
    })
  })

  describe('helpers', () => {
    describe('setAuthToken', () => {
      beforeEach(() => {
        Http._axios.defaults.headers = {}
      })

      it('should set the Authorization header', () => {
        Http.setAuthToken('fake-token')

        expect(Http._axios.defaults.headers.Authorization).toBe('Bearer fake-token')
      })
    })

    describe('removeAuthToken', () => {
      beforeEach(() => {
        Http._axios.defaults.headers = {}
      })

      it('should set the Authorization header', () => {
        Http._axios.defaults.headers.Authorization = 'fake-token'

        Http.removeAuthToken()
        expect(Http._axios.defaults.headers.Authorization).toBe(undefined)
      })
    })
  })
})
