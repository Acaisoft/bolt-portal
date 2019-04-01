export default ({ spacing }) => ({
  root: {
    backgroundColor: 'transparent',

    '&:before': {
      display: 'none',
    },
  },
  title: {
    fontWeight: 'bold',
  },
  summaryContent: {
    paddingLeft: spacing.unit * 3,
  },
  expandIcon: {
    left: 8,
    right: 'auto',
  },
  details: {
    paddingLeft: spacing.unit * 6,
  },
})
