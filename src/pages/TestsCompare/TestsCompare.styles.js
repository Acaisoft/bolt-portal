import { makeStyles } from '@material-ui/core'

export default makeStyles(({ spacing }) => {
  return {
    title: {
      marginBottom: spacing(4),
    },
    detailsSection: {
      flexBasis: '50%',
    },
    firstRun: {
      marginRight: '16px',
    },
  }
})
