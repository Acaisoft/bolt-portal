import Rematch from '~services/Rematch'

export default error => {
  if (
    error &&
    Object.prototype.hasOwnProperty.call(error, 'response') &&
    error.response === undefined
  ) {
    // Handle HTTP errors here
    Rematch.dispatch.messages.showMessage({
      type: 'error',
      message: error.message,
    })
  }
}
