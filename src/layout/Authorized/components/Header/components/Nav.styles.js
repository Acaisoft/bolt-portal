export default ({ palette, spacing }) => ({
  root: {
    margin: `0 ${spacing.unit * 3}px`,
  },
  button: {
    padding: `${spacing.unit * 3}px ${spacing.unit * 2}px`,
    borderTop: '6px solid transparent',
  },
  active: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    fontWeight: 'bold',
  },
})
