import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { useQuery } from 'react-apollo-hooks'
import {
  Button,
  MenuItem,
  Grid,
  withStyles,
  FormHelperText,
} from '@material-ui/core'
import { Add, VpnKey } from '@material-ui/icons'
import { Field } from 'react-final-form'
import { TestSourceForm } from '~containers/forms'
import { FormCondition, FormField } from '~containers'
import { ButtonWithIcon, Loader, SectionHeader, CopyToClipboard } from '~components'

import { TestSourceType } from '~config/constants'
import routes from '~config/routes'
import { getUrl } from '~utils/router'
import { useToggle } from '~hooks'

import { GET_REPOSITORY_KEY } from './graphql'
import styles from './Create.styles'

export function Create({ classes, history, match }) {
  const [isKeyVisible, toggleKeyInput] = useToggle(false)

  const {
    data: { repositoryKey },
    loading,
  } = useQuery(GET_REPOSITORY_KEY, {
    fetchPolicy: 'cache-first',
  })

  const handleSubmit = useCallback(
    values => {
      history.push(getUrl(routes.projects.sources.list, { ...match.params }))
    },
    [history, match]
  )

  const handleCancel = useCallback(() => {
    history.goBack()
  }, [history])

  const { projectId, testSourceId } = match.params

  const mode = testSourceId ? 'edit' : 'create'

  if (loading) {
    return <Loader loading />
  }

  return (
    <div>
      <TestSourceForm mode="create" projectId={projectId} onSubmit={handleSubmit}>
        {({ form, fields, handlers, isTestingConnection, isConnectionOk }) => {
          const repositoryFields = fields.repository.fields

          return (
            <React.Fragment>
              <SectionHeader title="Test Source">
                <Button
                  color="default"
                  variant="text"
                  disabled={form.submitting}
                  onClick={handleCancel}
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
                >
                  {mode === 'create' ? 'Create' : 'Update'}
                </ButtonWithIcon>
              </SectionHeader>

              <form onSubmit={form.handleSubmit}>
                <Grid container spacing={32}>
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
                        <Button
                          color="primary"
                          variant="contained"
                          disabled={!form.valid || isTestingConnection}
                          onClick={handlers.testConnection}
                          className={classes.marginLeft}
                        >
                          Test Connection
                        </Button>
                        <Field
                          name="repository.connection_status"
                          subscription={{ value: true, error: true }}
                        >
                          {({ input: { value }, meta: { error } }) =>
                            !!error && <FormHelperText error>{error}</FormHelperText>
                          }
                        </Field>
                      </div>
                    </Grid>
                  </FormCondition>
                </Grid>
              </form>
            </React.Fragment>
          )
        }}
      </TestSourceForm>
    </div>
  )
}
Create.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string.isRequired,
      testSourceId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withStyles(styles)(Create)
