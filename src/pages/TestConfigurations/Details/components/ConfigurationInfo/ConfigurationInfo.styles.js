export default ({ mixins, spacing }) => ({
  header: {
    marginBottom: spacing.unit * 3,
  },
  paper: {
    padding: mixins.scaledSpaceAround(6, 4, 4),
  },
})
