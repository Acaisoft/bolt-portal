import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette }) => ({
  '@global': {
    ':root': {
      '--toastify-color-success': palette.success.main,
      '--toastify-color-error': palette.error.main,
      '--toastify-color-info': palette.info.main,
      '--toastify-color-transparent': 'rgba(255, 255, 255, 0.3)',
    },
  },
  root: {},
  closeIcon: {
    fontSize: '0.9rem',
    margin: '5px 5px 0 0',
  },
  toastContainer: {
    paddingRight: 0,
  },
}))
