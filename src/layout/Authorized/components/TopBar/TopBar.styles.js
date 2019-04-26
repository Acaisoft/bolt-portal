export default ({ breakpoints, mixins, palette, spacing, typography, zIndex }) => ({
  root: {
    width: '100%',
  },
  appBar: {
    borderBottom: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.default,
    height: 85,
  },
  projectSelector: {
    marginLeft: spacing.unit * 4,
  },
  grow: {
    flexGrow: 1,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 350,
    zIndex: zIndex.appBar + 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuHeader: {
    ...mixins.gutters(),
    height: 85,
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid transparent',
  },
  menuItem: {
    padding: mixins.scaledSpaceAround(2, 3),
    marginLeft: 2,
    borderLeft: '3px solid transparent',
    color: palette.text.secondary,
  },
  menuItemSelected: {
    backgroundColor: palette.action.hover,
    borderLeftColor: palette.action.selected,
    fontWeight: 'bold',
    color: palette.text.primary,

    '& $menuIcon': {
      color: palette.action.selected,
    },
  },
  menuTitle: {
    ...typography.h6,
    color: palette.text.primary,
  },
  menuIcon: {
    marginRight: spacing.unit * 2,
  },
  title: {
    color: palette.text.primary,
    textDecoration: 'none',
    display: 'none',
    [breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  sectionDesktop: {
    display: 'none',
    [breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [breakpoints.up('md')]: {
      display: 'none',
    },
  },
})
