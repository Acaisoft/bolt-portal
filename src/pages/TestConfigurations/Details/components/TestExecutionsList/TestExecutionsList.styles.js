import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette }) => ({
  success: {
    color: palette.text.success,
  },
  failure: {
    color: palette.text.error,
  },
}))
