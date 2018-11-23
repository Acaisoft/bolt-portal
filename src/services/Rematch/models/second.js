import Http, { transformers } from '~services/Http'

const second = {
  state: {
    anotherThing: null,
  },
  reducers: {
    setAnotherThing: (state, payload) => ({ ...state, anotherThing: payload }),
  },
  effects: dispatch => ({
    async fetchAnotherThing() {
      try {
        const response = await Http.get('/second-endpoint')
        const { anotherThing, something } = response.data

        this.setAnotherThing(anotherThing)
        dispatch.first.setSomething(something)
      } catch (ex) {
        this.setAnotherThing(null)
        throw transformers.prepareResponseError(ex)
      }
    },
  }),
}

export default second
