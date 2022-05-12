import { makeStyles } from '@material-ui/core'

export default makeStyles(({ spacing }) => ({
  icon: {
    margin: spacing(0, 4, 0, 1.5),
    width: 41,
    height: 41,
  },
  root: {
    height: '100%',
    display: 'flex',
  },
  title: {
    fontSize: '1.125rem',
    marginBottom: spacing(1),
    fontWeight: 600,
  },
  subtitle: {
    fontSize: '0.9375rem',
  },
}))
