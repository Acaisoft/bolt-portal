import { TestSourceType } from '~config/constants'
import {
  makeFlatValidationSchema,
  makeEmptyInitialValues,
  validateOnFieldValue,
} from '~utils/forms'

const sourceTypeOptions = Object.entries(TestSourceType).map(([type, value]) => ({
  key: type,
  value,
  label: type,
}))

const createFormConfig = ({ configurationTypes }) => {
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

        connection_status: {},
      },
    },
  }

  const validationSchema = makeFlatValidationSchema(fields)
  const mergeInitialValues = values => {
    return makeEmptyInitialValues(fields, values)
  }

  return { fields, validationSchema, mergeInitialValues }
}

export { createFormConfig }
