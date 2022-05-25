/**
 * Copyright (c) 2022 Acaisoft
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Paper } from '@material-ui/core'
import _ from 'lodash'
import { TestSourceType } from 'config/constants'
import { Details } from 'assets/icons'
import { SectionHeader, LabeledValue, NoDataPlaceholder } from 'components'
import useStyles from './TestConfigurationDetails.styles'

function TestConfigurationDetails({ children, configuration, gridProps = {} }) {
  const classes = useStyles()
  const {
    configParameterItemProps,
    generalSectionProps,
    generalSectionItemProps,
    iconContainerProps,
  } = gridProps

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
    <Paper square className={classes.paper} data-testid="TestConfigDetails">
      <Grid container spacing={5} alignItems="center">
        <Grid
          item
          hidden="sm"
          md={1}
          container
          justifyContent="center"
          {...iconContainerProps}
        >
          <Grid item>
            <Details height={80} width={70} />
          </Grid>
        </Grid>
        <Grid item xs {...generalSectionProps}>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid item xs={12}>
              <SectionHeader size="medium" title="General" />
            </Grid>
            <Grid item xs={12} md={3} {...generalSectionItemProps}>
              <LabeledValue
                label="Test Source Type"
                value={source_type ? _.startCase(source_type) : '--'}
              />
            </Grid>
            <Grid item xs={12} md={3} {...generalSectionItemProps}>
              <LabeledValue
                label="Test Source Name"
                value={test_source ? test_source[source_type].name : '--'}
              />
            </Grid>
            {isRepository && (
              <Grid item xs={12} md={3} {...generalSectionItemProps}>
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
                        <Grid
                          key={parameter.parameter_slug}
                          item
                          xs={12}
                          md={3}
                          {...configParameterItemProps}
                        >
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
                        <Grid
                          key={parameter.parameter_slug}
                          item
                          xs={12}
                          md={3}
                          {...configParameterItemProps}
                        >
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
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
        >
          {actionButtons}
        </Grid>
      </Grid>
    </Paper>
  )
}

TestConfigurationDetails.propTypes = {
  children: PropTypes.node,
  configuration: PropTypes.object,
  gridProps: PropTypes.shape({
    iconContainerProps: PropTypes.object,
    generalSectionProps: PropTypes.object,
    generalSectionItemProps: PropTypes.object,
    configParameterItemProps: PropTypes.object,
  }),
}

export default TestConfigurationDetails
