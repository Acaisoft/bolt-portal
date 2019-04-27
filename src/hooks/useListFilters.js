import { useCallback, useState, useMemo } from 'react'

const useListFilters = (initialValues = {}) => {
  const initialState = useMemo(() => {
    return {
      pagination: {
        rowsPerPage: 10,
        offset: 0,
        ...initialValues.pagination,
      },
      orderBy: initialValues.orderBy,
      filters: initialValues.filters,
    }
  }, initialValues)

  const [rowsPerPage, setRowsPerPage] = useState(initialState.pagination.rowsPerPage)
  const [offset, setOffset] = useState(initialState.pagination.offset)
  const [orderBy, setOrderBy] = useState(initialState.orderBy)
  const [filters, setFilters] = useState(initialState.filters)

  const setPagination = useCallback(nextPagination => {
    setRowsPerPage(nextPagination.rowsPerPage)
    setOffset(nextPagination.offset)
  }, [])
  const setFilter = useCallback((key, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }))
  }, [])

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
