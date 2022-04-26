import { makeStyles } from '@material-ui/core'

export default makeStyles(({ spacing, palette }) => ({
  tableContainer: {
    margin: spacing(0, -5),
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  success: {
    color: palette.text.success,
  },
  failure: {
    color: palette.text.error,
  },
}))
