import { makeStyles } from '@material-ui/core'

export default makeStyles(({ spacing }) => ({
  link: {
    textDecoration: 'underline',
    fontWeight: 'normal',
    fontSize: 'inherit',
  },
  icon: {
    marginLeft: spacing(-1),
    marginRight: spacing(1),
    fontSize: '1.1rem',
  },
}))
