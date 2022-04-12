import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, spacing, zIndex }) => ({
  root: {
    position: 'fixed',
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
    background: palette.dropdown.main,
  },
  menu: {
    flexGrow: 1,
  },
  footerMenu: {
    borderTop: `1px solid ${palette.divider}`,
  },
  header: {
    height: 85,
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid transparent',
  },
  item: {
    padding: spacing(2, 3),
    marginLeft: 2,
    borderLeft: '3px solid transparent',
  },
  itemSelected: {
    backgroundColor: palette.dropdown.hover,
    borderLeftColor: palette.action.selected,
    fontWeight: 'bold',
    color: palette.text.primary,

    '& $icon': {
      color: palette.action.selected,
    },
  },
  title: {
    height: '100%',
    padding: '30px 0px',
  },
  icon: {
    marginRight: spacing(2),
  },
  button: {
    marginRight: 20,
  },
  logo: {
    height: '100%',
  },
}))
