import { makeStyles } from '@material-ui/core'

export default makeStyles(({ spacing }) => ({
  root: {
    margin: spacing(2),
  },
  holder: {
    display: 'flex',
    flex: '1 1 auto',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
