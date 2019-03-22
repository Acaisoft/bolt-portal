export default ({ palette, spacing, typography }) => {
  return {
    root: {
      flexGrow: 1,
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: 20,
    },
    drawer: {
      width: 475,
      height: 'calc(100% - 30px)',
      top: 15,
      right: 15,
      padding: '30px 15px',
    },
  }
}
