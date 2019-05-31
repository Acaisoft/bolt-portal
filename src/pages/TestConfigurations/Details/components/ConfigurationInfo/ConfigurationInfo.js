import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { Grid, Typography, Paper, Tooltip } from '@material-ui/core'
import { PlayArrow, Edit, Delete } from '@material-ui/icons'
import {
  SectionHeader,
  SubmitCancelModal,
  Button,
  LabeledValue,
  ExpandablePanel,
} from '~components'
import { Details } from '~assets/icons'

import { useToggle } from '~hooks'
import { TestSourceType } from '~config/constants'

import { useConfigurationRun, useConfigurationDelete } from '../../../hooks'

import useStyles from './ConfigurationInfo.styles'

export function ConfigurationInfo({
  breadcrumbs,
  configuration,
  onEdit = () => {},
  onDelete = () => {},
  onRun = () => {},
}) {
  const classes = useStyles()
  const [isDeleteModalOpen, toggleDeleteModal] = useToggle(false)

  const { loading: isStartingRun, mutation: runConfiguration } = useConfigurationRun(
    configuration.id
  )
  const {
    loading: isDeleting,
    mutation: deleteConfiguration,
  } = useConfigurationDelete(configuration.id)

  const handleRun = useCallback(
    async ({ coldStart = false }) => {
      const { errorMessage } = await runConfiguration({
        variables: { coldStart, configurationId: configuration.id },
      })
      onRun(errorMessage)
    },
    [runConfiguration, configuration]
  )

  const handleDeleteSubmit = useCallback(async () => {
    const { errorMessage } = await deleteConfiguration()
    toggleDeleteModal(false)
    onDelete(errorMessage)
  }, [onDelete])

  const {
    test_source,
    configuration_type,
    name,
    configuration_parameters = [],
    configuration_envvars = [],
    performed,
    has_pre_test,
    has_post_test,
    has_monitoring,
    has_load_tests,
  } = configuration
  const { source_type } = test_source || {}

  const isPerformed = Boolean(performed)
  const canRun = Boolean(test_source)
  const isRepository = source_type === TestSourceType.REPOSITORY
  return (
    <React.Fragment>
      <SectionHeader
        title={breadcrumbs[breadcrumbs.length - 1].label}
        description={(configuration_type || {}).name}
        className={classes.header}
      >
        <Tooltip
          title={
            !canRun
              ? 'You need to assign a test source before you will be able to start a test.'
              : ''
          }
        >
          <span>
            <Button
              variant="contained"
              color="primary"
              icon={PlayArrow}
              disabled={isStartingRun || !canRun}
              onClick={() => handleRun({ coldStart: false })}
              aria-label="Run"
            >
              Run
            </Button>
            <Button
              variant="contained"
              color="secondary"
              icon={PlayArrow}
              disabled={isStartingRun || !canRun}
              onClick={() => handleRun({ coldStart: true })}
              className={classes.buttonMargin}
              aria-label="Cold Run"
            >
              Cold Run
            </Button>
          </span>
        </Tooltip>
      </SectionHeader>

      <Paper square className={classes.paper}>
        <ExpandablePanel defaultExpanded={false} title="Scenario Details">
          <Grid container spacing={5} alignItems="center">
            <Grid item hidden="sm" md={1} container justify="center">
              <Grid item>
                <Details height={80} width={70} />
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12}>
                  <SectionHeader size="medium" title="General" />
                </Grid>
                <Grid item xs={12} md={3}>
                  <LabeledValue
                    label="Test Source Type"
                    value={source_type || '--'}
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
                      .map(parameter => (
                        <Grid key={parameter.parameter_slug} item xs={12} md={3}>
                          <LabeledValue
                            label={parameter.parameter.name}
                            value={parameter.value}
                          />
                        </Grid>
                      ))}
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
                      .map(parameter => (
                        <Grid key={parameter.parameter_slug} item xs={12} md={3}>
                          <LabeledValue
                            label={parameter.parameter.name}
                            value={parameter.value}
                          />
                        </Grid>
                      ))}
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
        </ExpandablePanel>
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            container
            justify="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Button
                icon={Edit}
                variant="outlined"
                color="default"
                onClick={onEdit}
              >
                <Typography variant="body2">Edit</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Tooltip
                title={isPerformed ? "You can't delete a performed scenario." : ''}
              >
                <span>
                  <Button
                    icon={Delete}
                    aria-label="Delete scenario"
                    variant="outlined"
                    color="default"
                    disabled={isPerformed || isDeleting}
                    onClick={() => toggleDeleteModal(true)}
                  >
                    <Typography variant="body2">Delete</Typography>
                  </Button>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <SubmitCancelModal
        isOpen={isDeleteModalOpen}
        onClose={() => toggleDeleteModal(false)}
        onSubmit={handleDeleteSubmit}
        submitLabel="Delete"
      >
        Are you sure you want to delete test configuration <q>{name}</q>?
      </SubmitCancelModal>
    </React.Fragment>
  )
}
ConfigurationInfo.propTypes = {
  breadcrumbs: PropTypes.array,
  configuration: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onRun: PropTypes.func,
}

export default ConfigurationInfo
