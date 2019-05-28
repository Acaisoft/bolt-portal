export default ({ palette, spacing }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  icon: {
    fontSize: '9rem',
    color: palette.text.icon,
  },
  progress: {
    marginRight: spacing.unit * 1.5,
  },
  description: {
    color: palette.text.secondary,
    marginTop: spacing.unit * 0.5,
  },
  title: {
    color: palette.text.primary,
  },
  titleHolder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.unit,
  },
})
