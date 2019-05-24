export default ({ mixins, spacing }) => ({
  header: {
    marginBottom: spacing.unit * 3,
  },
  paper: {
    padding: mixins.scaledSpaceAround(4),
  },
  buttonMargin: {
    marginLeft: spacing.unit,
  },
})
