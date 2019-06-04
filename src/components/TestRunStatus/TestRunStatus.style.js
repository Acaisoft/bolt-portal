import { makeStyles } from '@material-ui/core'
import { TestRunStatus as Status } from '~config/constants'

export default makeStyles(({ palette, spacing }) => ({
  icon: {
    marginRight: spacing(1.5),
    fontSize: '0.9rem',
    color: palette.info.contrastText,
  },
  [Status.FINISHED]: {
    background: palette.success.main,
  },
  [Status.ERROR]: {
    background: palette.error.main,
  },
  [Status.PENDING]: {
    background: palette.info.main,
  },
  root: {
    padding: spacing(0.5, 1),
    borderRadius: spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '0.8rem',
    color: palette.text.primary,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
}))
