import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: spacing(4),
    backgroundColor: 'lightBlue',
    color: palette.common.white,
  },
}))
