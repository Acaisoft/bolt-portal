import gql from 'graphql-tag'

const PROJECT_LIST_ITEM_FRAGMENT = gql`
  fragment projectListItem on project {
    id
    name
    description
    image_url
  }
`

export const GET_PROJECTS = gql`
  query getProjects {
    projects: project {
      ...projectListItem
    }
  }

  ${PROJECT_LIST_ITEM_FRAGMENT}
`
