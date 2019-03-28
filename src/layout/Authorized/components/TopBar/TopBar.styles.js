export default ({ breakpoints, palette, spacing }) => ({
  root: {
    width: '100%',
  },
  appBar: {
    borderBottom: `1px solid ${palette.divider}`,
    backgroundColor: palette.background.default,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuIcon: {
    marginRight: spacing.unit,
  },
  title: {
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
