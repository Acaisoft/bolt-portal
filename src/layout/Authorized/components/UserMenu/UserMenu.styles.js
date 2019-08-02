import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, spacing }) => ({
  userName: {
    margin: `0 ${spacing(1)}px 0 ${spacing(2)}px`,
    fontWeight: 600,
  },
  expandIcon: {
    color: palette.text.icon,
  },
}))
