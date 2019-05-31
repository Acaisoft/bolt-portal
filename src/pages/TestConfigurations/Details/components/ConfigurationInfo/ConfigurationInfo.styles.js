import { makeStyles } from '@material-ui/core'

export default makeStyles(({ mixins, spacing }) => ({
  header: {
    marginBottom: spacing(3),
  },
  paper: {
    padding: spacing(4),
  },
  buttonMargin: {
    marginLeft: spacing(1),
  },
}))
