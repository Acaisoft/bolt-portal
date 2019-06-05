import { makeStyles } from '@material-ui/core'

export default makeStyles(({ breakpoints, spacing }) => ({
  root: {},
  content: {
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
    [breakpoints.up("md")]: { paddingLeft: spacing(9), paddingRight: spacing(9) },
    [breakpoints.down("md")]: { paddingLeft: spacing(3), paddingRight: spacing(3) }
  },
  nav: {
    display: 'flex',
  },
}))
