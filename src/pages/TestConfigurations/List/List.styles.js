import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, typography }) => {
  return {
    root: {
      flexGrow: 1,
    },
    tableContainer: {
      width: '100%',
      marginTop: 30,
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: 20,
    },
    iconsContainer: {
      display: 'flex',
    },
    icon: {
      padding: '0.25em',
    },
    dateContainer: {
      display: 'flex',
      alignItems: 'center',
    },
  }
})
