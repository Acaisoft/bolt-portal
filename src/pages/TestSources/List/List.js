import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { useMutation } from 'react-apollo-hooks'
import { withStyles } from '@material-ui/core'
import { DeleteModal } from '~components'
import { TestSourcesList } from './components'

import routes from '~config/routes'
import { getUrl } from '~utils/router'
import { useToggle } from '~hooks'

import { DELETE_REPOSITORY } from './graphql'

import styles from './List.styles'

export function List({ classes, history, match }) {
  const { projectId } = match.params

  const {
    isModalOpen,
    selectedTestSource,
    handleDelete,
    handleDeleteSubmit,
    handleCloseModal,
  } = useDelete()
  const { handleCreate, handleEdit } = useHandlers(history, match)

  return (
    <div className={classes.root}>
      <TestSourcesList
        projectId={projectId}
        onCreate={handleCreate}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {isModalOpen && (
        <DeleteModal
          onClose={handleCloseModal}
          onSubmit={handleDeleteSubmit}
          type="test source"
          name={selectedTestSource.name}
        />
      )}
    </div>
  )
}
List.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

function useDelete() {
  const [isModalOpen, toggleModal] = useToggle(false)
  const [selectedTestSource, setSelectedTestSource] = useState(null)

  const deleteRepositoryMutation = useMutation(DELETE_REPOSITORY, {
    refetchQueries: ['getTestSources'],
  })

  const handleDelete = useCallback(testSource => {
    toggleModal(true)
    setSelectedTestSource(testSource)
  }, [])

  const handleCloseModal = useCallback(() => {
    toggleModal(false)
  }, [])

  const handleDeleteSubmit = useCallback(async () => {
    await deleteRepositoryMutation({ variables: { id: selectedTestSource.id } })
    handleCloseModal()
  }, [selectedTestSource])

  return {
    isModalOpen,
    handleDelete,
    handleDeleteSubmit,
    handleCloseModal,
  }
}

function useHandlers(history, match) {
  const redirectToPage = useCallback(
    (path, params = {}) => {
      history.push(getUrl(path, { ...match.params, ...params }))
    },
    [history, match]
  )

  const handleCreate = useCallback(() => {
    redirectToPage(routes.projects.sources.create)
  }, [])

  const handleEdit = useCallback(({ id }) => {
    redirectToPage(routes.projects.sources.edit, { sourceId: id })
  }, [])

  return {
    handleCreate,
    handleEdit,
  }
}

export default withStyles(styles)(List)
