const useLocalList = (data, listFilters) => {
  const { rowsPerPage, offset } = listFilters

  // TODO: Add filtering once we need it.

  const dataForCurrentPage = data.slice(offset, offset + rowsPerPage)

  return dataForCurrentPage
}

export default useLocalList
