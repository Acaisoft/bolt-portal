import Http, { transformers } from '~services/Http'

const first = {
  state: {
    something: null,
  },
  reducers: {
    setSomething: (state, payload) => ({ ...state, something: payload }),
  },
  effects: {
    async fetchSomething() {
      try {
        const response = await Http.get('/first-endpoint')
        this.setSomething(response.data)
      } catch (ex) {
        this.setSomething(null)
        throw transformers.prepareResponseError(ex)
      }
    },
  },
}

export default first
