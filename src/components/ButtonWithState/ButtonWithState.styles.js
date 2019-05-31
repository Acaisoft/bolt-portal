import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette }) => ({
  error: {
    backgroundColor: palette.error.main,
    color: palette.error.contrastText,
  },
  success: {
    backgroundColor: palette.success.main,
    color: palette.error.contrastText,
  },
}))
