import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, spacing }) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    padding: spacing(3),
    height: 560,
  },
  header: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '150%',
    marginBottom: spacing(3),
  },
  headerIcon: {
    height: 78,
    marginRight: spacing(3),
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  form: {
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
  },
  formFields: {
    flexGrow: 1,
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button:not(:first-child)': {
      marginLeft: spacing(1),
    },
  },
  cancelButton: {
    '&:hover': {
      backgroundColor: palette.button.cancel.hover
    },
    '& svg': {
      color: palette.text.error
    },
  },
  imagePreviewContainer: {
    maxWidth: '100%',
    width: 200,
  },
}))
