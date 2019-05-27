export default ({ palette }) => ({
  actionsContainer: {
    display: 'flex',
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  good: {
    color: palette.text.success,
  },
  average: {
    color: palette.text.warning,
  },
  bad: {
    color: palette.text.error,
  },
})
