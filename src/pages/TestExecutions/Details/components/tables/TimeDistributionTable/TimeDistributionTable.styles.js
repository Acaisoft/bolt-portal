export default ({ mixins, spacing }) => ({
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
  percentileHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  percentileProgress: {
    marginRight: spacing.unit * 0.5,
  },
})
