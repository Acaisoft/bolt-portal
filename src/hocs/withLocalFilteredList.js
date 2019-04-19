import React from 'react'
import { useLocalFilteredList } from '~hooks'

const withLocalFilteredList = ({
  dataProp = 'data',
  filtersProp = 'listFilters',
}) => Component => {
  const HOC = props => {
    const data = props[dataProp] || []
    const listFilters = props[filtersProp]

    const paginatedData = useLocalFilteredList(data, listFilters)

    return (
      <Component {...props} paginatedData={paginatedData} totalCount={data.length} />
    )
  }
  HOC.displayName = `withLocalFilteredList(${Component.displayName ||
    Component.name})`

  return HOC
}

export default withLocalFilteredList
