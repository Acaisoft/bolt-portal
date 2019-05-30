export default ({ mixins, palette, spacing, typography, zIndex }) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 350,
    zIndex: zIndex.appBar + 1,
  },
  paper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
  },
  menu: {
    flexGrow: 1,
  },
  footerMenu: {
    borderTop: `1px solid ${palette.divider}`,
  },
  header: {
    ...mixins.gutters(),
    height: 85,
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid transparent',
  },
  item: {
    padding: mixins.scaledSpaceAround(2, 3),
    marginLeft: 2,
    borderLeft: '3px solid transparent',
    color: palette.text.secondary,
  },
  itemSelected: {
    backgroundColor: palette.action.hover,
    borderLeftColor: palette.action.selected,
    fontWeight: 'bold',
    color: palette.text.primary,

    '& $icon': {
      color: palette.action.selected,
    },
  },
  title: {
    ...typography.h6,
    color: palette.text.primary,
  },
  icon: {
    marginRight: spacing.unit * 2,
  },
  button: {
    marginLeft: -12,
    marginRight: 20,
  },
})
