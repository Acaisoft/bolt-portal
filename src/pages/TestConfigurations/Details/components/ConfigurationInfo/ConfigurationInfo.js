import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { Tooltip, IconButton, MenuItem, Typography } from '@material-ui/core'

import { PlayArrow, MoreVert, Delete, Edit } from '@material-ui/icons'
import {
  SectionHeader,
  SubmitCancelModal,
  Button,
  ExpandablePanel,
  PopoverMenu,
} from '~components'

import { useToggle } from '~hooks'

import { useConfigurationRun, useConfigurationDelete } from '../../../hooks'

import useStyles from './ConfigurationInfo.styles'
import TestConfigurationDetails from '../TestConfigurationDetails'

export function ConfigurationInfo({
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
    [runConfiguration, configuration.id, onRun]
  )

  const handleDeleteSubmit = useCallback(async () => {
    const { errorMessage } = await deleteConfiguration()
    toggleDeleteModal(false)
    onDelete(errorMessage)
  }, [deleteConfiguration, onDelete, toggleDeleteModal])

  const { test_source, configuration_type, name, performed, id } = configuration

  const isPerformed = Boolean(performed)
  const canRun = Boolean(test_source)
  return (
    <React.Fragment>
      <SectionHeader title={name} description={(configuration_type || {}).name}>
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

            <PopoverMenu
              id="config-more-options"
              closeOnClick
              trigger={
                <IconButton
                  className={classes.buttonMargin}
                  aria-label="Scenario Actions Menu"
                >
                  <MoreVert />
                </IconButton>
              }
            >
              <MenuItem onClick={() => handleRun({ coldStart: true })}>
                Cold Run
              </MenuItem>
            </PopoverMenu>
          </span>
        </Tooltip>
      </SectionHeader>

      <ExpandablePanel defaultExpanded={false} title="Scenario Details">
        <TestConfigurationDetails configurationId={id}>
          <Button icon={Edit} variant="outlined" color="default" onClick={onEdit}>
            <Typography variant="body2">Edit</Typography>
          </Button>

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
        </TestConfigurationDetails>
      </ExpandablePanel>

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
