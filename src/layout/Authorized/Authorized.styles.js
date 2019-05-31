import { makeStyles } from '@material-ui/core'

export default makeStyles(({ mixins, spacing }) => ({
  root: {},
  content: {
    ...mixins.gutters(),
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
  },
  nav: {
    display: 'flex',
  },
}))
