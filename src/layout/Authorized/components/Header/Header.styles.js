export default ({ palette, spacing, typography }) => {
  const drawerWidth = 260

  return {
    root: {},
    brand: {
      ...typography.body2,
      color: 'inherit',
      textDecoration: 'none',
    },

    appBar: {
      backgroundColor: palette.background.default,
      color: palette.common.black,
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    Toolbar: {
      height: 67,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }
}
