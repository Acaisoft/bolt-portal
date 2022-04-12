import { gql } from '@apollo/client'

export const REQUEST_UPLOAD_URL = gql`
  mutation requestUploadUrl(
    $contentLength: Int!
    $contentType: String!
    $contentMD5: String!
  ) {
    request_upload_url: testrun_upload(
      content_length: $contentLength
      content_type: $contentType
      content_md5: $contentMD5
    ) {
      returning {
        object_id
        download_url
        upload_url
      }
    }
  }
`
