import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Form } from 'react-final-form'
import { withApollo, graphql, compose } from 'react-apollo'
import { toast } from 'react-toastify'
import { Loading } from '~components'

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
import { GET_TEST_SOURCES_QUERY } from '~services/GraphQL/Queries'

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

    await client.mutate({
      mutation:
        mode === 'create' ? ADD_REPOSITORY_MUTATION : EDIT_REPOSITORY_MUTATION,
      variables: {
        id: mode === 'edit' ? values.id : undefined,
        project_id: mode === 'create' ? projectId : undefined,
        name: values.name,
        url: values.url,
      },
      refetchQueries: [{ query: GET_TEST_SOURCES_QUERY }],
    })
  }

  validateRepository = async values => {
    this.setState({ isTestingConnection: true })

    const { client, mode, projectId } = this.props
    try {
      const res = await client.mutate({
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

      this.setState({ isTestingConnection: false, isConnectionOk: !res.errors })

      if (res.errors) {
        toast.error(res.errors[0].message)
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
      if (values.source_type === TestSourceType.REPOSITORY) {
        await this.submitRepository(values)
      }
      this.props.onSubmit(values)
    } catch (err) {
      toast.error('An error has occured. Test source was not created.')
    }
  }

  handleValidate = async values => {
    const formErrors = validateForm(values, this.state.formConfig.validationSchema)
    if (formErrors || !this.state.isTestingConnection) {
      return formErrors
    }

    if (!formErrors) {
      return this.validateRepository(values)
    }

    return null
  }

  render() {
    const { children, initialValues } = this.props
    const { formConfig } = this.state

    if (!formConfig) return <Loading />

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
                this.validateRepository(form.values)
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
