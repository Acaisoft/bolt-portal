import gql from 'graphql-tag'

export const GET_PROJECT_SUMMARIES = gql`
  query getProjectSummaries {
    summaries: testrun_project_summary {
      projects {
        id: project_id
        name
        description
        image_url
        num_scenarios
        num_sources
        num_tests_failed
        num_tests_passed
      }
    }
  }
`
