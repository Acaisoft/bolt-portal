export default ({ palette, spacing, typography }) => {
  return {
    root: {
      flexGrow: 1,
    },
    card: {
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      textDecoration: 'none',
    },
    gridContainer: {
      margin: '50px 0px',
    },
    tableContainer: {
      width: '100%',
    },
    linkContainer: {
      marginTop: 20,
      display: 'flex',
      justifyContent: 'flex-end',
      background: palette.grey.default,
      padding: '10px 5px',
    },
    link: {
      color: 'inherit',
      textDecoration: 'none',
    },
  }
}
