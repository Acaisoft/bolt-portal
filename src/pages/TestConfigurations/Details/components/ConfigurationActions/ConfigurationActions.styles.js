export default ({ breakpoints, spacing }) => ({
  actionButton: {
    margin: spacing.unit * 1,
    width: 120,
    height: 120,
    [breakpoints.down('sm')]: {
      width: 80,
      height: 80,
    },
    [breakpoints.down('md')]: {
      width: 100,
      height: 100,
    },
  },
  actionButtonLabel: {
    display: 'flex',
    flexDirection: 'column',
  },
})
