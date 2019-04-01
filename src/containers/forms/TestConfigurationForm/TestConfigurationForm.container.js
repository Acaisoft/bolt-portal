import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Formik } from 'formik'
import { Mutation, Query } from 'react-apollo'
import { toast } from 'react-toastify'
import { Loading } from '~components'

import { createFormConfig } from './formSchema'

import {
  ADD_CONFIGURATION_MUTATION,
  EDIT_REPOSITORY_MUTATION,
} from '~services/GraphQL/Mutations'
import {
  GET_CONFIGURATION_TYPES_QUERY,
  GET_PARAMETERS_QUERY,
  GET_CONFIGS_QUERY,
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
    const { children, initialValues, mode, projectId } = this.props
    return (
      <Query query={GET_PARAMETERS_QUERY}>
        {parametersQuery => {
          return (
            <Query query={GET_CONFIGURATION_TYPES_QUERY}>
              {configurationTypesQuery => {
                if (parametersQuery.loading || configurationTypesQuery.loading)
                  return <Loading />

                const formConfig = createFormConfig({
                  configurationTypes:
                    (configurationTypesQuery.data || {}).configuration_type || [],
                  parameters: (parametersQuery.data || {}).parameter || [],
                })

                return (
                  <Mutation
                    mutation={
                      mode === 'create'
                        ? ADD_CONFIGURATION_MUTATION
                        : EDIT_REPOSITORY_MUTATION
                    }
                    refetchQueries={[
                      { query: GET_CONFIGS_QUERY, variables: { projectId } },
                    ]}
                  >
                    {configurationMutation => {
                      return (
                        <Formik
                          initialValues={formConfig.mergeInitialValues(
                            initialValues
                          )}
                          onSubmit={values =>
                            this.handleSubmit(values, { configurationMutation })
                          }
                          validationSchema={formConfig.validationSchema}
                        >
                          {formikBag =>
                            children({ form: formikBag, fields: formConfig.fields })
                          }
                        </Formik>
                      )
                    }}
                  </Mutation>
                )
              }}
            </Query>
          )
        }}
      </Query>
    )
  }
}

export default TestConfigurationForm
