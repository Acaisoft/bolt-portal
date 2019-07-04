import { makeStyles } from '@material-ui/core'
import { TestRunStatus as Status } from '~config/constants'

export default makeStyles(({ palette, spacing }) => ({
  icon: {
    marginRight: spacing(1.2),
    fontSize: '0.9rem',
    color: palette.info.contrastText,
  },
  [Status.RUNNING]: {
    background: palette.primary.main,
  },
  [Status.FINISHED]: {
    background: palette.success.main,
  },
  [Status.SUCCEEDED]: {
    background: palette.success.main,
  },
  [Status.TERMINATED]: {
    background: palette.error.main,
  },
  [Status.ERROR]: {
    background: palette.error.main,
  },
  [Status.FAILED]: {
    background: palette.error.main,
  },
  [Status.PENDING]: {
    background: palette.info.main,
  },
  [Status.MONITORING]: {
    background: palette.warning.main,
  },
  [Status.UNKNOWN]: {
    background: palette.text.disabled,
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
    fontWeight: 'bold',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
}))
