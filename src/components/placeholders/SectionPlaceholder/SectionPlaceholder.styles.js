import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, spacing }) => ({
  root: {
    padding: spacing(6),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  topImage: {
    color: palette.text.icon,
    marginBottom: spacing(2),
  },
  variantIcon: {
    fontSize: 0, // Doesn't affect the icon size, but removes unnecessary bottom margin
    marginRight: spacing(1),
  },
  description: {
    color: palette.text.secondary,
    marginTop: spacing(0.5),
  },
  title: {
    color: palette.text.primary,
    fontWeight: 'bold',
  },
  titleHolder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    marginTop: spacing(3),
  },
}))
