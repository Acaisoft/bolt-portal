import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { useQuery } from 'react-apollo-hooks'
import { Form } from 'react-final-form'
import { Button, Grid, MenuItem, FormHelperText } from '@material-ui/core'
import { Add, VpnKey } from '@material-ui/icons'
import { FormField, FormCondition } from '~containers'
import {
  SectionHeader,
  ButtonWithIcon,
  CopyToClipboard,
  Loader,
  ButtonWithState,
} from '~components'

import { TestSourceType } from '~config/constants'
import { useToggle, useMutationWithState } from '~hooks'
import {
  makeEmptyInitialValues,
  makeFlatValidationSchema,
  validateForm,
} from '~utils/forms'

import {
  GET_REPOSITORY_KEY,
  GET_TEST_SOURCE,
  ADD_REPOSITORY_MUTATION,
  EDIT_REPOSITORY_MUTATION,
  ADD_REPOSITORY_VALIDATE_MUTATION,
  EDIT_REPOSITORY_VALIDATE_MUTATION,
} from './graphql'
import useStyles from './TestSourceForm.styles'
import { useFormSchema, preparePayload, prepareInitialValues } from './formSchema'

function TestSourceForm({
  mode,
  onCancel,
  onSubmit,
  onTestConnection = () => {},
  projectId,
  sourceId,
}) {
  const classes = useStyles()
  const [isKeyVisible, toggleKeyInput] = useToggle(false)

  const {
    data: { repositoryKey },
    loading: repositoryKeyLoading,
  } = useQuery(GET_REPOSITORY_KEY, {
    fetchPolicy: 'cache-first',
  })

  const { data: { testSource } = {}, loading: testSourceLoading } = useQuery(
    GET_TEST_SOURCE,
    {
      fetchPolicy: 'cache-and-network',
      variables: { sourceId },
      skip: mode !== 'edit',
    }
  )

  const { fields, loading: fieldsLoading } = useFormSchema({ mode })

  const handleSubmit = useTestSourceSubmit({
    sourceId,
    projectId,
    mode,
    onSubmit,
  })
  const handleValidate = useCallback(
    values => validateForm(values, makeFlatValidationSchema(fields)),
    [fields]
  )

  const {
    isConnectionOk,
    connectionError,
    isTestingConnection,
    handleConnectionTest,
  } = useConnectionTest({ mode, projectId, sourceId, onTestConnection })

  const initialValues = useMemo(
    () => makeEmptyInitialValues(fields, prepareInitialValues(testSource)),
    [fields, testSource]
  )

  if (repositoryKeyLoading || testSourceLoading || fieldsLoading) {
    return <Loader loading />
  }

  const repositoryFields = fields.repository.fields

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={handleValidate}
      subscription={{
        submitting: true,
        dirty: true,
        invalid: true,
        dirtySinceLastSubmit: true,
        validating: true,
      }}
      keepDirtyOnReinitialize
    >
      {form => (
        <React.Fragment>
          <SectionHeader title="Test Source">
            <Button
              color="default"
              variant="text"
              disabled={form.submitting}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <ButtonWithIcon
              className={classes.marginLeft}
              color="secondary"
              variant="contained"
              disabled={
                !isConnectionOk ||
                !form.dirty ||
                form.submitting ||
                form.validating ||
                form.invalid ||
                form.dirtySinceLastSubmit
              }
              icon={Add}
              onClick={form.handleSubmit}
              type="submit"
            >
              {mode === 'create' ? 'Create' : 'Update'}
            </ButtonWithIcon>
          </SectionHeader>

          <form onSubmit={form.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <FormField
                  name="source_type"
                  field={fields.source_type}
                  margin="normal"
                  variant="filled"
                  fullWidth
                >
                  {fields.source_type.options.map(type => (
                    <MenuItem
                      key={type.key}
                      value={type.value}
                      disabled={type.value === TestSourceType.TEST_CREATOR}
                    >
                      {type.label}
                    </MenuItem>
                  ))}
                </FormField>
              </Grid>
              <Grid item xs={12} md={6} />

              <FormCondition when="source_type" is={TestSourceType.REPOSITORY}>
                <Grid item xs={12} md={6}>
                  <FormField
                    name="repository.name"
                    field={repositoryFields.name}
                    margin="normal"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormField
                    name="repository.type_slug"
                    field={repositoryFields.type_slug}
                    margin="normal"
                    variant="filled"
                    fullWidth
                  >
                    {repositoryFields.type_slug.options.map(type => (
                      <MenuItem key={type.key} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </FormField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormField
                    name="repository.url"
                    field={repositoryFields.url}
                    margin="normal"
                    variant="filled"
                    fullWidth
                  />
                  <div>
                    {isKeyVisible && (
                      <CopyToClipboard
                        text={repositoryKey}
                        label="Repository Key"
                        margin="normal"
                        variant="filled"
                        multiline
                        fullWidth
                      />
                    )}
                    <ButtonWithIcon
                      color="primary"
                      variant="contained"
                      onClick={() => toggleKeyInput()}
                      icon={VpnKey}
                    >
                      {isKeyVisible ? 'Hide' : 'Show'} Key
                    </ButtonWithIcon>
                    <ButtonWithState
                      color="primary"
                      variant="contained"
                      disabled={form.invalid || isTestingConnection}
                      onClick={() =>
                        handleConnectionTest(form.form.getState().values)
                      }
                      className={classes.marginLeft}
                      loading={isTestingConnection}
                      success={isConnectionOk}
                      error={Boolean(connectionError)}
                    >
                      Test Connection
                    </ButtonWithState>
                    {Boolean(connectionError) && (
                      <FormHelperText error>
                        Connection error: {connectionError}
                      </FormHelperText>
                    )}
                  </div>
                </Grid>
              </FormCondition>
            </Grid>
          </form>
        </React.Fragment>
      )}
    </Form>
  )
}
TestSourceForm.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit']),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  onTestConnection: PropTypes.func,
  projectId: PropTypes.string,
  sourceId: PropTypes.string,
}

function useTestSourceSubmit({ mode, sourceId, projectId, onSubmit }) {
  const { mutation: submitRepositoryMutation } = useMutationWithState(
    mode === 'create' ? ADD_REPOSITORY_MUTATION : EDIT_REPOSITORY_MUTATION,
    {
      refetchQueries: ['getTestSources'],
    }
  )

  // TODO: submitTestCreatorMutation

  const handleSubmit = useCallback(
    async values => {
      const variables = preparePayload(values, { mode, projectId, sourceId })

      const { errorMessage } =
        values.source_type === TestSourceType.REPOSITORY
          ? await submitRepositoryMutation({ variables })
          : {} // TODO: submitTestCreatorMutation

      onSubmit({ values, errorMessage })
    },
    [submitRepositoryMutation, mode, sourceId, projectId, onSubmit]
  )

  return handleSubmit
}

function useConnectionTest({ mode, projectId, sourceId, onTestConnection }) {
  const [connectionError, setConnectionError] = useState(null)
  const [isConnectionOk, setIsConnectionOk] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)

  const { mutation: validateRepositoryMutation } = useMutationWithState(
    mode === 'create'
      ? ADD_REPOSITORY_VALIDATE_MUTATION
      : EDIT_REPOSITORY_VALIDATE_MUTATION
  )

  // TODO: validateTestCreatorMutation

  const handleConnectionTest = useCallback(
    async values => {
      setIsTestingConnection(true)
      setIsConnectionOk(false)
      setConnectionError(null)
      const variables = preparePayload(values, { mode, projectId, sourceId })

      const { errorMessage } =
        values.source_type === TestSourceType.REPOSITORY
          ? await validateRepositoryMutation({ variables })
          : {} // TODO: validateTestCreatorMutation

      setIsTestingConnection(false)
      setConnectionError(errorMessage || null)
      setIsConnectionOk(!errorMessage)

      onTestConnection({ variables, errorMessage })
    },
    [validateRepositoryMutation, mode, sourceId, projectId, onTestConnection]
  )

  return {
    isConnectionOk,
    connectionError,
    isTestingConnection,
    handleConnectionTest,
  }
}

export default TestSourceForm
