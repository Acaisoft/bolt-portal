export default ({ palette, spacing, typography }) => {
  return {
    root: {
      flexGrow: 1,
    },
    tableContainer: {
      width: '100%',
      overflowX: 'scroll',
      marginTop: 30,
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: 20,
    },
  }
}
