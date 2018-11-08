export const globalHttpErrorHandler = error => {
  if (
    error &&
    Object.prototype.hasOwnProperty.call(error, 'response') &&
    error.response === undefined
  ) {
    // Handle HTTP error here,
    // e.g. dispatch a global message action:
    // store.dispatch.messages.showMessage(...)
  }
}

export const getErrorFromResponse = (error = {}) => {
  if (error.response && error.response.data) {
    return error.response.data
  }
  if (error.message) {
    return error.message
  }
  return null
}

export const prepareResponseError = (error = {}) => {
  return {
    ...error,
    message: getErrorFromResponse(error),
  }
}
