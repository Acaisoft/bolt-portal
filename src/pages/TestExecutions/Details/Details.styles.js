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
      padding: mixins.scaledSpaceAround(5, 0),
    },
    tileTitle: {
      fontWeight: 'bold',
      marginBottom: spacing.unit * 4,
      padding: mixins.scaledSpaceAround(0, 5),
    },
    chartContainer: {
      padding: mixins.scaledSpaceAround(0, 5),
      marginBottom: -spacing.unit * 4,
    },
    header: {
      display: 'flex',
    },
    headerScenario: {
      fontWeight: 'normal',
    },
    headerSeparator: {
      color: '#F76F40',
    },
  }
}
