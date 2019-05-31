import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { useMutation } from 'react-apollo-hooks'
import { DeleteModal } from '~components'
import { TestSourcesList } from './components'

import routes from '~config/routes'
import { getUrl } from '~utils/router'
import { useToggle } from '~hooks'

import { DELETE_REPOSITORY } from './graphql'

import useStyles from './List.styles'

export function List({ history, match }) {
  const { projectId } = match.params
  const classes = useStyles()

  const {
    isModalOpen,
    selectedTestSource,
    handleDelete,
    handleDeleteSubmit,
    handleCloseModal,
  } = useDelete()
  const { getCreateTestSourceUrl, getEditTestSourceUrl } = useHandlers(
    history,
    match
  )

  return (
    <div className={classes.root}>
      <TestSourcesList
        projectId={projectId}
        getCreateTestSourceUrl={getCreateTestSourceUrl}
        onDelete={handleDelete}
        getEditTestSourceUrl={getEditTestSourceUrl}
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
  const getRedirectUr = useCallback(
    (path, params = {}) => {
      return getUrl(path, { ...match.params, ...params })
    },
    [history, match]
  )

  const getCreateTestSourceUrl = useCallback(() => {
    return getRedirectUr(routes.projects.sources.create)
  }, [])

  const getEditTestSourceUrl = useCallback(({ id }) => {
    return getRedirectUr(routes.projects.sources.edit, { sourceId: id })
  }, [])

  return {
    getCreateTestSourceUrl,
    getEditTestSourceUrl,
  }
}

export default List
