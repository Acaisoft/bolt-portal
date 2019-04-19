export default ({ spacing }) => {
  return {
    header: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: spacing.unit * 1.5,
    },
    root: {
      flexGrow: 1,
    },
    tableContainer: {
      width: '100%',
      marginTop: 30,
    },
  }
}
