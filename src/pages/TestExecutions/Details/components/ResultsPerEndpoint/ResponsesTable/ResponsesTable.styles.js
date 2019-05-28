export default ({ mixins, palette }) => ({
  tableContainer: {
    margin: mixins.scaledSpaceAround(0, -5),
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  success: {
    color: palette.text.success,
  },
  failure: {
    color: palette.text.error,
  },
})
