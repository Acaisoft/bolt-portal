import { makeStyles } from '@material-ui/core'

export default makeStyles(({ spacing }) => ({
  root: {
    backgroundColor: 'transparent',

    '&:before': {
      display: 'none',
    },
  },
  title: {
    fontWeight: 'bold',
  },
  summaryContent: {
    paddingLeft: spacing(3),
  },
  expandIcon: {
    position: 'absolute',
    left: 8,
    right: 'auto',
  },
  details: {
    paddingLeft: spacing(6),
  },
}))
