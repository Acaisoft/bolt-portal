import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, shape, typography }) => {
  return {
    content: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actions: {
      padding: 0,
      justifyContent: 'center',
    },
  }
})
