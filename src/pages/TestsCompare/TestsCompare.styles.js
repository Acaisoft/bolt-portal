import { makeStyles } from '@material-ui/core'

export default makeStyles(({ spacing }) => {
  return {
    title: {
      marginBottom: spacing(4),
    },
    bottomSection: {
      marginTop: spacing(4),
    },
  }
})
