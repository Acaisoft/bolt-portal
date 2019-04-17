import React from 'react'
import { useLocalPagination, useQueryPagination } from '~hooks'

export const withQueryPagination = ({ queryProp = 'data' }) => Component => {
  const HOC = props => {
    const pagination = useQueryPagination(props[queryProp])
    return <Component {...props} pagination={pagination} />
  }
  HOC.displayName = `withQueryPagination(${Component.displayName})`

  return HOC
}

export const withLocalPagination = ({
  dataProp = 'data',
  initialState,
}) => Component => {
  const HOC = props => {
    const data = props[dataProp]

    const pagination = useLocalPagination(data, initialState)
    const paginatedData = data.slice(
      pagination.offset,
      pagination.offset + pagination.rowsPerPage
    )

    return (
      <Component {...props} pagination={pagination} paginatedData={paginatedData} />
    )
  }
  HOC.displayName = `withLocalPagination(${Component.displayName})`

  return HOC
}
