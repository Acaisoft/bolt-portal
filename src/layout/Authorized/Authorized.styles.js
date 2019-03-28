export default ({ mixins, spacing }) => ({
  root: {},
  content: {
    ...mixins.gutters(),
    paddingTop: spacing.unit * 3,
    paddingBottom: spacing.unit * 3,
  },
  nav: {
    display: 'flex',
  },
})
