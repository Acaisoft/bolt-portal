import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form } from 'react-final-form'
import { Mutation, compose, graphql } from 'react-apollo'
import { toast } from 'react-toastify'
import { Loading } from '~components'

import { createFormConfig } from './formSchema'

import { validateForm } from '~utils/forms'
import {
  GET_CONFIGURATION_QUERY,
  ADD_CONFIGURATION_MUTATION,
  EDIT_CONFIGURATION_MUTATION,
} from './graphql'
import {
  GET_CONFIGURATION_TYPES_QUERY,
  GET_PARAMETERS_QUERY,
} from '~services/GraphQL/Queries'

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
      return {
        name: data.name,
        configuration_type: data.type_slug,
        parameters: data.configuration_parameters.reduce((acc, parameter) => ({
          ...acc,
          [parameter.parameter_slug]: parameter.value,
        })),
      }
    }
  }

  handleSubmit = (values, { configurationMutation }) => {
    const { id, name, configuration_type, parameters } = values
    const configurationParameters = Object.entries(parameters).map(
      ([slug, value]) => ({ parameter_slug: slug, value })
    )

    try {
      const variables = {
        name,
        configuration_parameters: configurationParameters,
        type_slug: configuration_type,
      }

      if (this.props.mode === 'create') {
        variables.project_id = this.props.projectId
      } else {
        variables.id = id
      }

      configurationMutation({ variables })
    } catch (err) {
      toast.error('An error has occured. Scenario was not created.')
    }

    this.props.onSubmit(values)
  }

  render() {
    const {
      children,
      mode,
      parametersQuery,
      configurationTypesQuery,
      initialValues,
    } = this.props

    if (parametersQuery.loading || configurationTypesQuery.loading)
      return <Loading />

    const formConfig = createFormConfig({
      configurationTypes: configurationTypesQuery.configuration_type || [],
      parameters: parametersQuery.parameter || [],
    })

    return (
      <Mutation
        mutation={
          mode === 'create'
            ? ADD_CONFIGURATION_MUTATION
            : EDIT_CONFIGURATION_MUTATION
        }
        refetchQueries={['getTestConfigurations']}
      >
        {configurationMutation => {
          return (
            <Form
              initialValues={formConfig.mergeInitialValues(initialValues)}
              onSubmit={values =>
                this.handleSubmit(values, { configurationMutation })
              }
              validate={validateForm(formConfig.validationSchema)}
            >
              {form => children({ form, fields: formConfig.fields })}
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
  graphql(GET_CONFIGURATION_QUERY, {
    props: props => ({
      initialValues:
        props.data &&
        TestConfigurationForm.prepareData(props.data.configuration_by_pk),
    }),
    skip: props => props.mode !== 'edit',
    options: props => ({
      variables: { configurationId: props.configurationId },
    }),
  })
)(TestConfigurationForm)
