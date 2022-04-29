export function mockGraphqlData(query, data, variables, errors) {
  return {
    request: {
      query,
      ...(!!variables && { variables }),
    },
    result: {
      data,
      errors,
    },
  }
}
