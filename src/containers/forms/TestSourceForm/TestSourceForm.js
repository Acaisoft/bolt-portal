import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Form } from 'react-final-form'
import { withApollo, graphql, compose } from 'react-apollo'
import { toast } from 'react-toastify'
import { Loader } from '~components'

import { createFormConfig } from './formSchema'
import {
  ADD_REPOSITORY_MUTATION,
  EDIT_REPOSITORY_MUTATION,
  ADD_REPOSITORY_VALIDATE_MUTATION,
  EDIT_REPOSITORY_VALIDATE_MUTATION,
  GET_CONFIGURATION_TYPES_QUERY,
} from './graphql'

import { TestSourceType } from '~config/constants'
import { validateForm } from '~utils/forms'

export class TestSourceForm extends PureComponent {
  static propTypes = {
    client: PropTypes.object.isRequired,
    configurationTypes: PropTypes.array,
    initialValues: PropTypes.object,
    mode: PropTypes.oneOf(['create', 'edit']),
    onSubmit: PropTypes.func,
    projectId: PropTypes.string,
  }

  static defaultProps = {
    configurationTypes: [],
    mode: 'create',
    onSubmit: () => {},
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !nextProps.loading &&
      nextProps.configurationTypes !== prevState.configurationTypes
    ) {
      return {
        formConfig: createFormConfig({
          configurationTypes: nextProps.configurationTypes,
        }),
      }
    }

    return null
  }

  constructor(props) {
    super(props)

    this.state = {
      formConfig: createFormConfig({ configurationTypes: props.configurationTypes }),
      isTestingConnection: false,
      isConnectionOk: false,
    }
  }

  submitRepository = async values => {
    const { client, mode, projectId } = this.props

    return client.mutate({
      errorPolicy: 'all',
      mutation:
        mode === 'create' ? ADD_REPOSITORY_MUTATION : EDIT_REPOSITORY_MUTATION,
      variables: {
        id: mode === 'edit' ? values.id : undefined,
        project_id: mode === 'create' ? projectId : undefined,
        name: values.repository.name,
        repository_url: values.repository.url,
        type_slug: values.repository.type_slug,
      },
      refetchQueries: ['getTestSources'],
    })
  }

  validateRepository = async values => {
    const { client, mode, projectId } = this.props

    return client.mutate({
      errorPolicy: 'all',
      mutation:
        mode === 'create'
          ? ADD_REPOSITORY_VALIDATE_MUTATION
          : EDIT_REPOSITORY_VALIDATE_MUTATION,
      variables: {
        id: mode === 'edit' ? values.id : undefined,
        project_id: mode === 'create' ? projectId : undefined,
        name: values.repository.name,
        repository_url: values.repository.url,
        type_slug: values.repository.type_slug,
      },
    })
  }

  handleTestRepositoryConnection = async values => {
    this.setState({ isTestingConnection: true })

    try {
      const res = await this.validateRepository(values)
      const error = res.errors && res.errors[0].message

      this.setState({ isTestingConnection: false, isConnectionOk: !error })
      if (error) {
        toast.error(error)
      } else {
        toast.success('Connection test passed!')
      }
    } catch (ex) {
      console.log('Failed to test connection.', ex.message)
      toast.error('Failed to test connection. Please retry after a while.')
    }
  }

  handleSubmit = async values => {
    try {
      let response
      if (values.source_type === TestSourceType.REPOSITORY) {
        response = await this.submitRepository(values)
      }

      const responseData = !response.errors
        ? response.data.repository.returning
        : null

      this.props.onSubmit({
        values,
        response,
        responseData,
      })
    } catch (err) {
      toast.error('An error has occured. Test source was not created.')
    }
  }

  handleValidate = async values => {
    return validateForm(values, this.state.formConfig.validationSchema)
  }

  render() {
    const { children, initialValues } = this.props
    const { formConfig } = this.state

    if (!formConfig) return <Loader loading fill />

    return (
      <Form
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validate={this.handleValidate}
        keepDirtyOnReinitialize
      >
        {form =>
          children({
            form,
            fields: formConfig.fields,
            handlers: {
              testConnection: () => {
                this.handleTestRepositoryConnection(form.values)
              },
            },
            isTestingConnection: this.state.isTestingConnection,
            isConnectionOk: this.state.isConnectionOk,
          })
        }
      </Form>
    )
  }
}

export default compose(
  withApollo,
  graphql(GET_CONFIGURATION_TYPES_QUERY, {
    name: 'configurationTypesQuery',
    props: ({ configurationTypesQuery: { loading, configuration_type } }) => {
      return {
        loading,
        configurationTypes: configuration_type,
      }
    },
  })
)(TestSourceForm)
