import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Mutation } from 'react-apollo'
import FileUploader from './FileUploader.component'

import { REQUEST_UPLOAD_URL } from './graphql'
import { getFileHash, readFile, uploadFileToGCS } from './FileUploader.module'

export class FileUploadContainer extends Component {
  static propTypes = {
    accept: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    onError: PropTypes.func,
    onStart: PropTypes.func,
    onSuccess: PropTypes.func,
    onLoad: PropTypes.func,
  }

  static defaultProps = {
    onError: () => {},
    onStart: () => {},
    onSuccess: () => {},
  }

  state = {
    customError: null,
  }

  handleChange = async (e, requestUploadUrl) => {
    const files = e.currentTarget.files
    if (files.length === 0) {
      return
    }

    this.props.onStart()
    const file = files[0]

    try {
      if (typeof this.props.onLoad === 'function') {
        this.props.onLoad(await readFile(file, 'data-url'))
      }

      const fileHash = await getFileHash(await readFile(file, 'binary-string'))

      const res = await requestUploadUrl({
        variables: {
          contentType: file.type,
          contentLength: file.size,
          contentMD5: fileHash,
        },
      })

      const result = res.data.request_upload_url.returning
      if (!result || result.length === 0) {
        console.log('Failed to request upload url.', res)
        throw new Error('Failed to request upload url.')
      }

      const uploadRequestData = result[0]
      await uploadFileToGCS({
        url: uploadRequestData.upload_url,
        file,
        fileHash,
      })

      this.props.onSuccess(uploadRequestData)
      this.setState({ customError: null })
    } catch (ex) {
      this.setState({ customError: ex.message })
      this.props.onError(ex)
    }
  }

  render() {
    const { accept, id, label } = this.props

    return (
      <Mutation mutation={REQUEST_UPLOAD_URL}>
        {(requestUploadUrl, { data, loading, error }) => {
          const errorMessage = (error || this.state.customError || {}).message

          return (
            <FileUploader
              accept={accept}
              id={id}
              label={label}
              loading={loading}
              error={errorMessage}
              onChange={e => this.handleChange(e, requestUploadUrl)}
            />
          )
        }}
      </Mutation>
    )
  }
}

export default FileUploadContainer
