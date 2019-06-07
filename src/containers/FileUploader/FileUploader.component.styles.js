import { makeStyles } from '@material-ui/core'

export default makeStyles(({palette, spacing}) => ({
  button: {
    color: palette.text.secondary,
    'padding-left': spacing(3),
    'padding-right': spacing(3),
    'padding-bottom': spacing(1),
    'padding-top': spacing(1),
  },
  input: {
    display: 'none',
  },
}))
