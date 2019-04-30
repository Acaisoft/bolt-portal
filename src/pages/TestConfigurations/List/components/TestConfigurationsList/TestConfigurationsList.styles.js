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
    color: palette.success.main,
  },
  average: {
    color: palette.warning.light,
  },
  bad: {
    color: palette.error.main,
  },
})
