import gql from 'graphql-tag'
export default gql(`
{
	repository {
		 id
		 name
		 username
		 url
	 }
 } 
`)
