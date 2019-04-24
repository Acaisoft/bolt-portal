export default ({ mixins }) => ({
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
})
