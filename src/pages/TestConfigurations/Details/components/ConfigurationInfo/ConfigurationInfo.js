import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { Grid, Typography } from '@material-ui/core'
import { SubmitCancelModal } from '~components'

import { useToggle } from '~hooks'

import { ConfigurationActions } from '..'
import { useConfigurationRun, useConfigurationDelete } from '../../../hooks'

const testSourceProperties = {
  repository: ['name', 'url'],
  test_creator: ['name'],
}

export const ConfigurationInfo = ({
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

  const handleRun = useCallback(async () => {
    const error = await runConfiguration()
    onRun(error)
  }, [runConfiguration])

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

  return (
    <React.Fragment>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Name: {name}</Typography>
          <Typography variant="body1">
            Test type: {(configuration_type || {}).name}
          </Typography>
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
          {(configuration_parameters || []).map(param => (
            <Typography key={param.parameter_slug} variant="body2">
              {param.parameter_slug}: {param.value}
            </Typography>
          ))}
        </Grid>
        <Grid item container xs={12} sm={6} alignItems="stretch">
          <ConfigurationActions
            canRun={Boolean(test_source)}
            isPerformed={Boolean(performed)}
            isRunning={isStartingRun}
            isDeleting={isDeleting}
            onDelete={() => toggleDeleteModal(true)}
            onEdit={onEdit}
            onRun={handleRun}
          />
        </Grid>
      </Grid>

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
  configuration: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onRun: PropTypes.func,
}

export default ConfigurationInfo
