export default ({ palette, typography }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    ...typography.body2,
    fontWeight: 'bold',
  },
  value: {
    ...typography.body2,
  },
})
