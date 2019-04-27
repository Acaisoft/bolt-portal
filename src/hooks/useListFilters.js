import { useCallback, useState } from 'react'

const useListFilters = (initialValues = {}) => {
  const state = {
    pagination: {
      rowsPerPage: 10,
      offset: 0,
      ...initialValues.pagination,
    },
    orderBy: initialValues.orderBy,
    filters: initialValues.filters,
  }

  const [rowsPerPage, setRowsPerPage] = useState(state.pagination.rowsPerPage)
  const [offset, setOffset] = useState(state.pagination.offset)
  const [orderBy, setOrderBy] = useState(state.orderBy)
  const [filters, setFilters] = useState(state.filters)

  const setPagination = useCallback(nextPagination => {
    setRowsPerPage(nextPagination.rowsPerPage)
    setOffset(nextPagination.offset)
  })
  const setFilter = useCallback((key, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }))
  })

  return {
    pagination: {
      rowsPerPage,
      offset,
    },
    orderBy,
    filters,

    setPagination,
    setOrderBy,
    setFilters,
    setFilter,
  }
}

export default useListFilters
