import { useCallback, useEffect, useState } from 'react'

const usePagination = (initialState = {}) => {
  const [rowsPerPage, setRowsPerPage] = useState(initialState.rowsPerPage || 10)
  const [offset, setOffset] = useState(initialState.offset || 0)
  const page = offset / rowsPerPage

  const onChange = useCallback(pagination => {
    setRowsPerPage(pagination.rowsPerPage)
    setOffset(pagination.offset)
  }, [])

  return {
    rowsPerPage,
    offset,
    page,
    onChange,
  }
}

const useLocalPagination = (data = [], initialState) => {
  const totalCount = data.length
  const pagination = usePagination(initialState)

  return {
    ...pagination,
    totalCount,
  }
}

const useQueryPagination = queryData => {
  const pagination = usePagination({
    rowsPerPage: queryData.variables.limit,
    offset: queryData.variables.offset,
  })
  const totalCount = queryData.pagination ? queryData.pagination.aggregate.count : 0

  useEffect(() => {
    queryData.refetch({
      limit: pagination.rowsPerPage,
      offset: pagination.offset,
    })
  }, [pagination.rowsPerPage, pagination.offset])

  return {
    ...pagination,
    totalCount,
  }
}

export { useLocalPagination, useQueryPagination }
