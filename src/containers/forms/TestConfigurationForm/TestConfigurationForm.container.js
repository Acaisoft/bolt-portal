import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form } from 'react-final-form'
import { Mutation, compose, graphql } from 'react-apollo'
import { toast } from 'react-toastify'
import { Loader } from '~components'

import { createFormConfig } from './formSchema'

import { validateForm } from '~utils/forms'
import {
  GET_CONFIGURATION_QUERY,
  ADD_CONFIGURATION_MUTATION,
  EDIT_CONFIGURATION_MUTATION,
  GET_TEST_SOURCES_FOR_PROJECT,
} from './graphql'
import {
  GET_CONFIGURATION_TYPES_QUERY,
  GET_PARAMETERS_QUERY,
} from '~services/GraphQL/Queries'
import { TestSourceType } from '~config/constants'

export class TestConfigurationForm extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    mode: PropTypes.oneOf(['create', 'edit']),
    onSubmit: PropTypes.func,
    projectId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    mode: 'create',
    onSubmit: () => {},
  }

  static prepareData = data => {
    if (data) {
      const {
        name,
        type_slug,
        configuration_parameters,
        performed,
        test_source,
      } = data

      return {
        scenario_name: name,
        configuration_type: type_slug,
        performed,
        parameters: configuration_parameters.reduce(
          (acc, parameter) => ({
            ...acc,
            [parameter.parameter_slug]: parameter.value,
          }),
          {}
        ),
        test_source_type: test_source && test_source.source_type,
        test_source: test_source
          ? {
              [test_source.source_type]: test_source.id,
            }
          : null,
      }
    }

    return {}
  }

  handleSubmit = async (values, { configurationMutation }) => {
    const { scenario_name, configuration_type, parameters } = values
    const { configurationId, mode, projectId, onSubmit } = this.props
    const configurationParameters = Object.entries(parameters).map(
      ([slug, value]) => ({ parameter_slug: slug, value })
    )

    try {
      const variables = {
        name: scenario_name,
        configuration_parameters: configurationParameters,
        type_slug: configuration_type,
        test_source_id: values.test_source[values.test_source_type],
      }

      if (mode === 'create') {
        variables.project_id = projectId
      } else {
        variables.id = configurationId
      }

      await configurationMutation({ variables })
      onSubmit({ values, mode })
    } catch (err) {
      // TODO: Handle GraphQL errors (or other) in a helper
      const message =
        Array.isArray(err.graphQLErrors) && err.graphQLErrors.length > 0
          ? err.graphQLErrors[0].message
          : err.message

      toast.error(`Error: ${message}`)
    }
  }

  render() {
    const {
      children,
      mode,
      parametersQuery,
      configurationTypesQuery,
      testSourcesQuery,
      initialValues,
    } = this.props

    if (
      parametersQuery.loading ||
      configurationTypesQuery.loading ||
      testSourcesQuery.loading
    )
      return <Loader loading fill />

    const formConfig = createFormConfig({
      configurationTypes: configurationTypesQuery.configuration_type || [],
      parameters: parametersQuery.parameter || [],
      testSources: testSourcesQuery.test_source || [],
      testSourceTypes: [
        { slug_name: TestSourceType.REPOSITORY, label: 'Repository' },
        // { slug_name: TestSourceType.TEST_CREATOR, label: 'Test Creator' }, // Disabled for now
      ],
      isPerformed: initialValues ? initialValues.performed : false,
    })

    return (
      <Mutation
        mutation={
          mode === 'create'
            ? ADD_CONFIGURATION_MUTATION
            : EDIT_CONFIGURATION_MUTATION
        }
        refetchQueries={[
          'getTestConfigurations',
          mode === 'edit' ? 'getConfiguration' : '',
        ]}
      >
        {configurationMutation => {
          return (
            <Form
              initialValues={formConfig.mergeInitialValues(initialValues)}
              onSubmit={values =>
                this.handleSubmit(values, { configurationMutation })
              }
              validate={values => validateForm(values, formConfig.validationSchema)}
              keepDirtyOnReinitialize
            >
              {form =>
                children({
                  form,
                  fields: formConfig.fields,
                  initialValues: initialValues || {},
                })
              }
            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default compose(
  graphql(GET_PARAMETERS_QUERY, { name: 'parametersQuery' }),
  graphql(GET_CONFIGURATION_TYPES_QUERY, { name: 'configurationTypesQuery' }),
  graphql(GET_TEST_SOURCES_FOR_PROJECT, {
    name: 'testSourcesQuery',
    options: ({ projectId }) => ({ variables: { projectId } }),
  }),
  graphql(GET_CONFIGURATION_QUERY, {
    props: props => ({
      initialValues: TestConfigurationForm.prepareData(
        props.data && props.data.configuration_by_pk
      ),
    }),
    skip: props => props.mode !== 'edit',
    options: props => ({
      variables: { configurationId: props.configurationId },
    }),
  })
)(TestConfigurationForm)
