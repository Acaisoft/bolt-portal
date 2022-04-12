export function mockGraphqlData(query, data, variables) {
  return {
    request: {
      query,
      ...(!!variables && { variables }),
    },
    result: {
      data,
    },
  }
}
