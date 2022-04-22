import { makeStyles } from '@material-ui/core'

export default makeStyles(({ spacing }) => {
  return {
    root: {
      flexGrow: 1,
    },
    tableContainer: {
      width: '100%',
      marginTop: 30,
    },
    tile: {
      padding: spacing(5),
    },
    tileTitle: {
      fontWeight: 'bold',
      marginBottom: spacing(2),
    },
    chartContainer: {
      marginBottom: spacing(-4),
    },
    paper: {
      padding: spacing(4),
      width: '100%',
    },
    configDetails: {
      marginBottom: spacing(2),
    },
  }
})
