import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, spacing }) => ({
  circle: {
    height: 64,
    width: 64,
    borderRadius: '50%',
    border: '2px solid #4E4D6E',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: palette.background.paper,
  },
  active: {
    background: '#4E4D6E',
    color: '#4E4D6E',
  },
  paper: {
    background: '#4E4D6E',
    padding: spacing(3),
  },
  step: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: `${spacing(15)}px 0`,
  },
  section: {
    // height: 700,
  },
  typography: {
    fontSize: 13,
  },

  stepTitle: {
    fontSize: palette.dropdown.fontSize,
    fontWeight: 'normal',
    padding: spacing(1),
  },

  statusIcon: {
    marginRight: spacing(1),
    display: 'flex',
  },

  icon: {
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '50%',
    background: palette.success.main,
    border: `2px solid ${palette.success.main}`,
  },

  failed: {
    background: palette.error.main,
    border: `2px solid ${palette.error.main}`,
  },

  line: {
    background: '#4E4D6E',
    display: 'block',
    height: 2,
    position: 'absolute',
    right: 0,
    transform: 'skewY(-5deg)',
    transformOrigin: '100%',
  },
}))
