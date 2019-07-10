import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { SectionHeader, NoDataPlaceholder } from '~components'

import ChartFilter from '../ChartFilter'
import LineChart from '~components/LineChart'

export function MonitoringLineChart({ config, data, groupNames }) {
  const [selected, setSelected] = useState([...groupNames])

  return (
    <React.Fragment>
      <SectionHeader title={config.title} size="small" marginBottom>
        <ChartFilter
          groupNames={groupNames}
          onChange={evt => setSelected(evt.target.value)}
          selected={selected}
        />
      </SectionHeader>

      {groupNames.length > 0 ? (
        <LineChart data={data} config={config} groupNames={selected} />
      ) : (
        <NoDataPlaceholder title="No Data" height={300} />
      )}
    </React.Fragment>
  )
}
MonitoringLineChart.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  groupNames: PropTypes.array.isRequired,
}

export default MonitoringLineChart
