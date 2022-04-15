import { useMemo } from 'react'
import { TestSourceType } from 'config/constants'
import { validateOnFieldValue } from 'utils/forms'
import { GET_CONFIGURATION_TYPES_QUERY } from './graphql'
import { useQuery } from '@apollo/client'

const sourceTypeOptions = Object.entries(TestSourceType).map(([type, value]) => ({
  key: type,
  value,
  label: type,
}))

function useFormSchema({ mode }) {
  const { data: { configurationTypes } = {}, loading } = useQuery(
    GET_CONFIGURATION_TYPES_QUERY
  )

  const fields = useMemo(
    () =>
      generateFields({
        configurationTypes: configurationTypes || [],
      }),
    [configurationTypes]
  )

  return { loading, fields }
}

function generateFields({ configurationTypes }) {
  const fields = {
    source_type: {
      validator: {
        inclusion: sourceTypeOptions.map(sto => sto.value),
      },
      options: sourceTypeOptions,
      inputProps: {
        select: true,
        label: 'Source Type',
      },
    },

    repository: {
      fields: {
        name: {
          validator: validateOnFieldValue('source_type', TestSourceType.REPOSITORY, {
            presence: { allowEmpty: false },
            length: { minimum: 3 },
          }),
          inputProps: {
            label: 'Repository name',
          },
        },

        type_slug: {
          validator: validateOnFieldValue('source_type', TestSourceType.REPOSITORY, {
            presence: { allowEmpty: false },
            inclusion: configurationTypes.map(cto => cto.slug_name),
          }),
          options: configurationTypes.map(cto => ({
            key: cto.id,
            value: cto.slug_name,
            label: cto.name,
          })),
          inputProps: {
            select: true,
            label: 'Configuration Type',
          },
        },

        url: {
          validator: validateOnFieldValue('source_type', TestSourceType.REPOSITORY, {
            presence: { allowEmpty: false },
            format: {
              pattern:
                '((git|ssh|http(s)?)|(git@[\\w\\.]+))(:(//)?)([\\w\\.@\\:/\\-~]+)(\\.git)(/)?',
              flags: 'i',
              message: 'has invalid format. Use: git@repo.com:path/to/repo.git',
            },
          }),
          inputProps: {
            label: 'Repository URL',
          },
        },
      },
    },
  }

  return fields
}

function prepareInitialValues(data) {
  if (!data) {
    return {
      source_type: TestSourceType.REPOSITORY,
      repository: {
        type_slug: 'load_tests',
      },
    }
  }

  const formValues = {
    source_type: data.source_type,
  }

  if (data.source_type === TestSourceType.REPOSITORY) {
    const { name, type_slug, url } = data.repository
    formValues.repository = {
      name,
      type_slug,
      url,
    }
  } else {
    // TODO: Add mapping for test creator when needed
  }

  return formValues
}

function preparePayload(formValues, { mode, projectId, sourceId, testPerformed }) {
  if (!formValues) {
    return {}
  }

  const { repository } = formValues
  const cannotEditSlug = mode === 'edit' && testPerformed

  const dbValues = {
    name: repository.name,
    repository_url: repository.url,
    ...(!cannotEditSlug && { type_slug: repository.type_slug }),
  }

  if (mode === 'create') {
    dbValues.project_id = projectId
  } else {
    dbValues.id = sourceId
  }

  return dbValues
}

export { useFormSchema, prepareInitialValues, preparePayload }
