export const setFieldData = ([name, data], state) => {
  const field = state.fields[name]
  if (field) {
    field.data = { ...field.data, ...data }
  }
}

export const setFieldError = ([name, error], state) => {
  const field = state.fields[name]
  if (field) {
    field.error = error
  }
}
