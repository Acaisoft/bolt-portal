import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import FileUploader from './FileUploader.component'

import { REQUEST_UPLOAD_URL } from './graphql'
import { getFileHash, readFile, uploadFileToGCS } from './FileUploader.module'
import { useMutationWithState } from '~hooks'

export function FileUploadContainer({
  accept,
  id,
  label,
  onLoad,
  onError = () => {},
  onStart = () => {},
  onSuccess = () => {},
}) {
  const [customError, setCustomError] = useState(null)

  const {
    loading,
    error,
    mutation: requestUploadUrlMutation,
  } = useMutationWithState(REQUEST_UPLOAD_URL)

  const handleChange = useCallback(
    async e => {
      const files = e.currentTarget.files
      if (files.length === 0) {
        return
      }

      onStart()
      const file = files[0]

      try {
        if (typeof onLoad === 'function') {
          onLoad(await readFile(file, 'data-url'))
        }

        const fileHash = await getFileHash(await readFile(file, 'binary-string'))

        const { errorMessage, response } = await requestUploadUrlMutation({
          variables: {
            contentType: file.type,
            contentLength: file.size,
            contentMD5: fileHash,
          },
        })

        const result = response.data.request_upload_url.returning
        if (errorMessage || !result || result.length === 0) {
          console.log('Failed to request upload url.', errorMessage, response)
          throw new Error('Failed to request upload url.', errorMessage)
        }

        const uploadRequestData = result[0]
        await uploadFileToGCS({
          url: uploadRequestData.upload_url,
          file,
          fileHash,
        })

        onSuccess(uploadRequestData)
        setCustomError(null)
      } catch (ex) {
        setCustomError(ex.message)
        onError(ex)
      }
    },
    [onLoad, onError, onStart, onSuccess]
  )

  const errorMessage = (error || customError || {}).message

  return (
    <FileUploader
      accept={accept}
      id={id}
      label={label}
      loading={loading}
      error={errorMessage}
      onChange={handleChange}
    />
  )
}
FileUploader.propTypes = {
  accept: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onError: PropTypes.func,
  onStart: PropTypes.func,
  onSuccess: PropTypes.func,
  onLoad: PropTypes.func,
}

export default FileUploadContainer
