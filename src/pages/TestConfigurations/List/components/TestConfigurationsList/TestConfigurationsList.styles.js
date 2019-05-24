export default ({ palette }) => ({
  iconsContainer: {
    display: 'flex',
  },
  icon: {
    padding: '0.25em',
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
