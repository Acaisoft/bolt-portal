import { makeStyles } from '@material-ui/core'

export default makeStyles(
  ({ breakpoints, palette, spacing, typography, zIndex }) => ({
    root: {
      width: '100%',
    },
    appBar: {
      borderBottom: `1px solid ${palette.divider}`,
      backgroundColor: palette.background.default,
      height: 85,
    },
    navBreadcrumbs: {
      marginLeft: spacing(4),
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -6,
      marginRight: spacing(3),
      width: 40,
      height: 40,
      borderRadius: 7,
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
)
