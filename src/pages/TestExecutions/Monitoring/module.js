import _ from 'lodash'

export function getDataForChart(
  { node_name, x_data_key, y_data_key, y_label },
  monitoringData
) {
  const ticksForNode = monitoringData.map(md => {
    const parsedData = JSON.parse(md.data)

    return {
      timestamp: +new Date(parsedData.timestamp),
      data: parsedData.data[node_name] || [],
    }
  })

  const groupNames = getUniqueGroupNames(ticksForNode, y_label)
  const emptyGroups = createEmptyGroups(groupNames)
  const data = ticksForNode.map(({ data, timestamp }) => ({
    timestamp,
    groups: {
      ...emptyGroups,
      ..._.mapValues(_.keyBy(data, y_label), y_data_key),
    },
  }))
  return { groupNames, data }
}

export function getUniqueGroupNames(ticksForNode, y_label) {
  return [
    ...new Set(
      _.flatMap(ticksForNode, tick => {
        if (!tick.data) return []

        // TODO:
        // Temp fix - some node data is an object instead of an array of objects
        // Remove when mock data is fixed
        if (!Array.isArray(tick.data)) {
          tick.data = [tick.data]
        }

        return tick.data.reduce((accumulatedGroups, group) => {
          if (!group) return accumulatedGroups
          return [...accumulatedGroups, group[y_label]]
        }, [])
      })
    ),
  ]
}

export function createEmptyGroups(groupNames) {
  return groupNames.reduce((acc, name) => {
    return {
      ...acc,
      [name]: null,
    }
  }, {})
}
