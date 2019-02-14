import gql from 'graphql-tag'

export default gql(`
mutation ($name: String, $url: String, $projectId: uuid) {
    repository: insert_repository(objects: [{name: $name, url: $url, project_id: $projectId}]) {
      returning {
        id
        url
        name
        project {
          id
          name
        }
      }
    }
  }
`)
