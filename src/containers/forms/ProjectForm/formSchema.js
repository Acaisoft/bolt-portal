import { makeFlatValidationSchema, makeEmptyInitialValues } from 'utils/forms'

const createFormConfig = () => {
  const fields = {
    name: {
      validator: {
        presence: { allowEmpty: false },
        length: { minimum: 3 },
      },
      inputProps: {
        variant: 'filled',
        label: 'Name',
      },
    },
    description: {
      validator: {
        length: { maximum: 512 },
      },
      inputProps: {
        variant: 'filled',
        label: 'Description',
      },
    },
    uploaded_image: {
      inputProps: {
        accept: 'image/png, image/jpeg, image/gif',
        label: 'Upload Image',
        id: 'project_image',
      },
      handlers: (form, input) => ({
        onStart: () =>
          form.form.mutators.setFieldData('uploaded_image', {
            started: true,
          }),
        onSuccess: info => form.form.change('image_url', info.download_url),
        onError: err => form.form.change('image_url', undefined),
        onLoad: fileAsDataUrl =>
          form.form.change('image_preview_url', fileAsDataUrl),
      }),
    },
    image_url: {},
    image_preview_url: {},
  }

  const validationSchema = makeFlatValidationSchema(fields)
  const makeInitialValues = values => makeEmptyInitialValues(fields, values)

  return { fields, validationSchema, makeInitialValues }
}

export { createFormConfig }
