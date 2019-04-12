export default ({ palette, spacing, typography }) => {
  return {
    actions: {
      flex: '1 1 50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionButton: {
      margin: spacing.unit * 1,
    },
    actionButtonLabel: {
      display: 'flex',
      flexDirection: 'column',
    },
    buttonsHolder: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'stretch',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: spacing.unit * 1.5,
    },
    information: {
      flex: '1 1 50%',
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
