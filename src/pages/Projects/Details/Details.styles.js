export default ({ palette, spacing, typography }) => {
  return {
    root: {
      flexGrow: 1,
    },
    card: {
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
    },
    gridContainer: {
      margin: '50px 0px',
    },
    tableContainer: {
      width: '100%',
      overflowX: 'scroll',
    },
    linkContainer: {
      marginTop: 20,
      display: 'flex',
      justifyContent: 'flex-end',
      background: palette.gray.default,
      padding: '10px 5px',
    },
    link: {
      color: palette.black,
      textDecoration: 'none',
      textTransform: 'uppercase',
    },
  }
}
