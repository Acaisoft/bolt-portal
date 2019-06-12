import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, spacing }) => ({
  actionsContainer: {
    display: 'flex',
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  rateContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  rateMeter: {
    marginLeft: spacing(1.5),
  },
}))
