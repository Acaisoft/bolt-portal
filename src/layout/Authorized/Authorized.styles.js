const drawerWidth = 260

export default ({ mixins, spacing }) => ({
  root: {},
  content: {
    ...mixins.gutters(),
    paddingBottom: spacing.unit * 3,
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    paddingTop: 64,
  },
  nav: {
    display: 'flex',
  },
})
