export default ({ palette, spacing }) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'stretch',
    padding: spacing.unit * 3,
  },
  header: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '150%',
    marginBottom: spacing.unit * 3,
  },
  headerIcon: {
    height: 78,
    marginRight: spacing.unit * 3,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  form: {
    paddingLeft: spacing.unit * 4,
    paddingRight: spacing.unit * 4,
  },
  formFields: {
    flexGrow: 1,
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      marginLeft: spacing.unit,
    },
  },
  imagePreviewContainer: {
    maxWidth: '100%',
    width: 200,
  },
})
