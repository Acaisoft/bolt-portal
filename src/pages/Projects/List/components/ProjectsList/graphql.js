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
export const GET_PROJECT_SUMMARIES = gql`
  query getProjectSummaries {
    summaries: testrun_project_summary {
      projects {
        num_scenarios
        name
        num_sources
        num_tests_failed
        num_tests_passed
        project_id
      }
    }
  }
`
