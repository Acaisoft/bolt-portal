import { useCallback, useState } from 'react'

const useListFilters = initialValues => {
  const state = {
    rowsPerPage: 10,
    offset: 0,
    ...initialValues,
  }

  const [rowsPerPage, setRowsPerPage] = useState(state.rowsPerPage)
  const [offset, setOffset] = useState(state.offset)

  const setPagination = useCallback(nextPagination => {
    setRowsPerPage(nextPagination.rowsPerPage)
    setOffset(nextPagination.offset)
  })

  return {
    rowsPerPage,
    offset,
    setRowsPerPage,
    setOffset,
    setPagination,
  }
}

export default useListFilters
