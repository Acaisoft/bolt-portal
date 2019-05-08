import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { Grid, Typography, Paper, withStyles, Tooltip } from '@material-ui/core'
import { PlayArrow, Edit, Delete } from '@material-ui/icons'
import {
  SectionHeader,
  SubmitCancelModal,
  ButtonWithIcon,
  LabeledValue,
  Breadcrumbs,
} from '~components'
import { Details } from '~assets/icons'

import { useToggle } from '~hooks'
import { TestSourceType } from '~config/constants'

import { useConfigurationRun, useConfigurationDelete } from '../../../hooks'

import styles from './ConfigurationInfo.styles'

export const ConfigurationInfo = ({
  breadcrumbs,
  classes,
  configuration,
  onEdit = () => {},
  onDelete = () => {},
  onRun = () => {},
}) => {
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
      const error = await runConfiguration({
        variables: { coldStart, configurationId: configuration.id },
      })
      onRun(error)
    },
    [runConfiguration, configuration]
  )

  const handleDeleteSubmit = useCallback(async () => {
    const error = await deleteConfiguration()
    toggleDeleteModal(false)
    onDelete(error)
  }, [onDelete])

  const {
    test_source,
    configuration_type,
    name,
    configuration_parameters,
    performed,
  } = configuration
  const { source_type } = test_source || {}

  const isPerformed = Boolean(performed)
  const canRun = Boolean(test_source)
  const isRepository = source_type === TestSourceType.REPOSITORY

  return (
    <React.Fragment>
      <SectionHeader
        title={<Breadcrumbs items={breadcrumbs} />}
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
            <ButtonWithIcon
              variant="contained"
              color="primary"
              icon={PlayArrow}
              disabled={isStartingRun || !canRun}
              onClick={() => handleRun({ coldStart: false })}
              aria-label="Run Test"
            >
              Run Test
            </ButtonWithIcon>
            <ButtonWithIcon
              variant="contained"
              color="secondary"
              icon={PlayArrow}
              disabled={isStartingRun || !canRun}
              onClick={() => handleRun({ coldStart: true })}
              className={classes.buttonMargin}
              aria-label="Run Test without cache"
            >
              Run Test without cache
            </ButtonWithIcon>
          </span>
        </Tooltip>
      </SectionHeader>

      <Paper square className={classes.paper}>
        <Grid container spacing={40} alignItems="center">
          <Grid item hidden="sm" md={1} container justify="center">
            <Grid item>
              <Details height={80} width={70} />
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container spacing={32} alignItems="center">
              <Grid item xs={12} md={3}>
                <LabeledValue label="Test Source Type" value={source_type || '--'} />
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
              <Grid item xs={isRepository ? 3 : 6} />

              {(configuration_parameters || []).map(parameter => (
                <Grid key={parameter.parameter_slug} item xs={12} md={3}>
                  <LabeledValue
                    label={parameter.parameter.name}
                    value={parameter.value}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify="flex-end"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <ButtonWithIcon
                icon={Edit}
                variant="outlined"
                color="default"
                onClick={onEdit}
              >
                <Typography variant="body2">Edit</Typography>
              </ButtonWithIcon>
            </Grid>
            <Grid item>
              <Tooltip
                title={isPerformed ? "You can't delete a performed scenario." : ''}
              >
                <span>
                  <ButtonWithIcon
                    icon={Delete}
                    aria-label="Delete scenario"
                    variant="outlined"
                    color="default"
                    disabled={isPerformed || isDeleting}
                    onClick={() => toggleDeleteModal(true)}
                  >
                    <Typography variant="body2">Delete</Typography>
                  </ButtonWithIcon>
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

export default withStyles(styles)(ConfigurationInfo)
