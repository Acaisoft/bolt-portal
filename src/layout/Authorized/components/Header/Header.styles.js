export default ({ palette, spacing, typography }) => {
  return {
    root: {},
    brand: {
      ...typography.body2,
      color: 'inherit',
      textDecoration: 'none',
    },

    AppBar: {
      backgroundColor: palette.blue[300],
      color: palette.common.white,
    },
    Toolbar: {
      height: 67,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }
}
