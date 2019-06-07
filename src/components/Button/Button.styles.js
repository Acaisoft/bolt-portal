import { makeStyles } from '@material-ui/core'

export default makeStyles(({ spacing }) => ({
  link: {
    textDecoration: 'underline',
    fontWeight: 'normal',
    fontSize: 'inherit',
  },
  label: {
    marginRight: spacing(0.5),
  },
  icon: {
    margin: spacing(0, 1, 0, -0.5),
    fontSize: '1.1rem',
  },
}))
