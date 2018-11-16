export default ({ mixins, spacing }) => ({
  root: {
    ...mixins.gutters(),
    paddingTop: spacing.unit * 2,
    paddingBottom: spacing.unit * 2,
  },
})
