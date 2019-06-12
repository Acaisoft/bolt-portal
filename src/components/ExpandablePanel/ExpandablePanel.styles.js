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
  summary: {
    padding: 0,
    justifyContent: 'flex-start',
  },
  summaryContent: {
    flexGrow: 0,
  },
  expandIcon: {},
  details: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}))
