export const getErrorFromResponse = (error = {}) => {
  if (error.response && error.response.data) {
    return error.response.data
  }
  if (error.message) {
    return error.message
  }
  return null
}

export default (error = {}) => {
  return {
    ...error,
    message: getErrorFromResponse(error),
  }
}
