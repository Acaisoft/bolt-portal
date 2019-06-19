import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  linkItem: {
    fontWeight: 'normal',
  },
  textItem: {
    fontWeight: 'bold',
  },
  separator: {
    color: palette.primary.dark,
    fontSize: '1.4rem',
    margin: spacing(0, 1.5),
  },
}))
