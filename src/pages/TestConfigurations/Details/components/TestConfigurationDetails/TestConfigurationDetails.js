import React from 'react'
import { Grid, Paper } from '@material-ui/core'

import { SectionHeader, LabeledValue, NoDataPlaceholder } from '~components'
import useStyles from './TestConfigurationDetails.styles'
import { TestSourceType } from '~config/constants'
import { Details } from '~assets/icons'
import _ from 'lodash'

function TestConfigurationDetails({ children, configuration }) {
  const classes = useStyles()

  if (!configuration) {
    return (
      <Grid item xs={12}>
        <Paper square className={classes.paper}>
          <NoDataPlaceholder title="Details not found" />
        </Paper>
      </Grid>
    )
  }

  const {
    test_source,
    configuration_parameters = [],
    configuration_envvars = [],
    has_pre_test,
    has_post_test,
    has_monitoring,
    has_load_tests,
  } = configuration
  const { source_type } = test_source || {}
  const isRepository = source_type === TestSourceType.REPOSITORY

  const actionButtons = React.Children.map(children, child => {
    return <Grid item>{child}</Grid>
  })

  return (
    <Paper square className={classes.paper}>
      <Grid container spacing={5} alignItems="center">
        <Grid item hidden="sm" md={1} container justify="center">
          <Grid item>
            <Details height={80} width={70} />
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid item xs={12}>
              <SectionHeader size="medium" title="General" />
            </Grid>
            <Grid item xs={12} md={3}>
              <LabeledValue
                label="Test Source Type"
                value={source_type ? _.startCase(source_type) : '--'}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <LabeledValue
                label="Test Source Name"
                value={test_source ? test_source[source_type].name : '--'}
              />
            </Grid>
            {isRepository && (
              <Grid item xs={12} md={3}>
                <LabeledValue
                  label="Test Source URL"
                  value={test_source[source_type].url}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <SectionHeader size="medium" title="Scenario Parts" />
            </Grid>
            {Boolean(has_pre_test) && (
              <Grid item xs={12}>
                <LabeledValue label="Pre-test Script" value="Yes" />
              </Grid>
            )}
            {Boolean(has_post_test) && (
              <Grid item xs={12}>
                <LabeledValue label="Post-test Script" value="Yes" />
              </Grid>
            )}
            {Boolean(has_monitoring) && (
              <React.Fragment>
                <Grid item xs={12}>
                  <LabeledValue label="Monitoring Script" value="Yes" />
                </Grid>
                {configuration_parameters
                  .filter(parameter =>
                    parameter.parameter_slug.includes('monitoring')
                  )
                  .map(
                    parameter =>
                      parameter.parameter && (
                        <Grid key={parameter.parameter_slug} item xs={12} md={3}>
                          <LabeledValue
                            label={parameter.parameter.name}
                            value={parameter.value}
                          />
                        </Grid>
                      )
                  )}
              </React.Fragment>
            )}

            {Boolean(has_load_tests) && (
              <React.Fragment>
                <Grid item xs={12}>
                  <LabeledValue label="Load Tests Script" value="Yes" />
                </Grid>
                {configuration_parameters
                  .filter(parameter =>
                    parameter.parameter_slug.includes('load_tests')
                  )
                  .map(
                    parameter =>
                      parameter.parameter && (
                        <Grid key={parameter.parameter_slug} item xs={12} md={3}>
                          <LabeledValue
                            label={parameter.parameter.name}
                            value={parameter.value}
                          />
                        </Grid>
                      )
                  )}
              </React.Fragment>
            )}

            {configuration_envvars.length > 0 && (
              <React.Fragment>
                <Grid item xs={12}>
                  <SectionHeader
                    size="medium"
                    title="Custom Environment Variables"
                  />
                </Grid>
                {configuration_envvars.map(envvar => (
                  <Grid key={envvar.name} item xs={12} md={3}>
                    <LabeledValue label={envvar.name} value={envvar.value} />
                  </Grid>
                ))}
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={5}>
        <Grid
          item
          xs={12}
          container
          justify="flex-end"
          alignItems="center"
          spacing={1}
        >
          {actionButtons}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TestConfigurationDetails
