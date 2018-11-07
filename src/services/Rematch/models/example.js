const example = {
  state: {
    something: null,
  },
  reducers: {
    setSomething: (state, payload) => ({ ...state, something: payload }),
  },
  effects: {
    async getSomething() {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.setSomething('new value')
      } catch (ex) {
        this.setSomething(null)
      }
    },
  },
}

export default example
