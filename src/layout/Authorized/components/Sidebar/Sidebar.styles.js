const drawerWidth = 260

export default ({ palette, spacing }) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    color: palette.gray.default,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: palette.primary.main,
    padding: `${spacing.unit * 3}px ${spacing.unit * 2}px`,
  },
  text: {
    color: palette.gray.default,
  },
  intro: {
    display: 'flex',
    alignItems: 'center',
  },
  introText: {
    margin: 0,
    marginLeft: 15,
  },
  itemIcon: {
    color: palette.gray.default,
    marginRight: 0,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})
