import React from 'react'
import { Typography, withStyles } from '@material-ui/core'

import styles from './ConfigurationInfo.styles'

const testSourceProperties = {
  repository: ['name', 'url'],
  test_creator: ['name'],
}

export const ConfigurationInfo = ({ configuration, classes }) => {
  const {
    test_source = {},
    configuration_type = {},
    name,
    configuration_parameters = [],
  } = configuration
  const { source_type } = test_source

  return (
    <div className={classes.root}>
      <Typography variant="body1">Name: {name}</Typography>
      <Typography variant="body1">Test type: {configuration_type.name}</Typography>
      <br />
      <Typography variant="body1">Test source: {source_type}</Typography>
      {source_type &&
        (testSourceProperties[source_type] || []).map(property => (
          <Typography key={property} variant="body2">
            {property}: {test_source[source_type][property]}
          </Typography>
        ))}
      <br />
      <Typography variant="body1">Configuration parameters:</Typography>
      {configuration_parameters.map(param => (
        <Typography key={param.parameter_slug} variant="body2">
          {param.parameter_slug}: {param.value}
        </Typography>
      ))}
    </div>
  )
}

export default withStyles(styles)(ConfigurationInfo)
