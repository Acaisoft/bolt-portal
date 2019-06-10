import { makeStyles } from '@material-ui/core'

export default makeStyles(({ mixins, spacing }) => {
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
  }
})
