import { makeStyles } from '@material-ui/core'

export default makeStyles(({ spacing }) => ({
  icon: {
    margin: spacing(0, 1.5),
  },
  root: {
    height: '100%',
    display: 'flex',
  },
  title: {
    fontSize: '1.1rem',
    marginBottom: spacing(1),
    fontWeight: 600,
  },
  subtitle: {
    fontSize: '0.9rem',
  },
}))
