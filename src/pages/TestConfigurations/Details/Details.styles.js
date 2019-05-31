import { makeStyles } from '@material-ui/core'

export default makeStyles(({ spacing }) => {
  return {
    header: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: spacing(1.5),
    },
    root: {
      flexGrow: 1,
    },
    tableContainer: {
      width: '100%',
      marginTop: 30,
    },
  }
})
