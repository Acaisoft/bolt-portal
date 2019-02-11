import gql from 'graphql-tag'
export default gql(`
	{
		project {
			id,
      name,
      description
		}
	}
`)
