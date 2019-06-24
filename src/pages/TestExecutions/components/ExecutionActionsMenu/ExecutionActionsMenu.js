import React, { useCallback } from 'react'

import { IconButton, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { PopoverMenu } from '~components'
import { Debug, Terminate } from '~assets/icons'
import { useNotification } from '~hooks'

import routes from '~config/routes'
import { TestRunStatus as TestRunStatusEnum } from '~config/constants'
import { getUrl } from '~utils/router'

import { useExecutionTerminate } from '../../hooks'

function ExecutionActionsMenu({ execution }) {
  const notify = useNotification()

  const getExecutionDebugUrl = useCallback(execution => {
    return getUrl(routes.argo.workflows.details, { argo_name: execution.argo_name })
  }, [])

  const handleExecutionTerminate = useCallback(
    ({ error, ok }) => {
      if (!ok) {
        notify.error(`Could not terminate: ${error}`)
      } else {
        notify.success(`Test run has been terminated.`)
      }
    },
    [notify]
  )

  const terminateExecution = useExecutionTerminate({
    onTerminate: handleExecutionTerminate,
  })

  return (
    <PopoverMenu
      id={execution.id}
      closeOnClick
      trigger={
        <IconButton>
          <MoreVert />
        </IconButton>
      }
    >
      {execution.argo_name && (
        <MenuItem
          component="a"
          href={getExecutionDebugUrl(execution)}
          title="View test run in Argo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemIcon>
            <Debug />
          </ListItemIcon>
          <ListItemText>Debug</ListItemText>
        </MenuItem>
      )}
      <MenuItem
        onClick={() => terminateExecution(execution)}
        title="Terminate the test run"
        disabled={[
          TestRunStatusEnum.FINISHED,
          TestRunStatusEnum.TERMINATED,
        ].includes(execution.status)}
      >
        <ListItemIcon>
          <Terminate />
        </ListItemIcon>
        <ListItemText>Terminate</ListItemText>
      </MenuItem>
    </PopoverMenu>
  )
}

export default ExecutionActionsMenu
