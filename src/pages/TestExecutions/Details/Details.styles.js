export default ({ palette, mixins, spacing, typography }) => {
  return {
    root: {
      flexGrow: 1,
    },
    tableContainer: {
      width: '100%',
      marginTop: 30,
    },
    tile: {
      padding: mixins.scaledSpaceAround(5, 5),
    },
    tileTitle: {
      fontWeight: 'bold',
      marginBottom: spacing.unit * 4,
    },
    chartContainer: {
      marginBottom: -spacing.unit * 4,
    },
  }
}
