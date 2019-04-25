export default ({ mixins, palette }) => ({
  tableContainer: {
    margin: mixins.scaledSpaceAround(0, -5),
  },
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
  noWrap: {
    whiteSpace: 'nowrap',
  },
  success: {
    color: palette.success.main,
  },
  failure: {
    color: palette.error.main,
  },
})
