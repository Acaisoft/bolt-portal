const messages = {
  reducers: {
    showMessage(state, { autoHideDuration = 5000, message, type }) {
      return {
        autoHideDuration,
        isOpen: true,
        message,
        type,
      }
    },
    hideMessage(state) {
      return {
        autoHideDuration: 0,
        isOpen: false,
        message: null,
        type: null,
      }
    },
  },
  state: {
    autoHideDuration: 0,
    isOpen: false,
    message: null,
    type: null,
  },
}

export default messages
