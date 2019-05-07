export default ({ palette, typography }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  label: {
    ...typography.body2,
  },
  value: {
    ...typography.body2,
    fontWeight: 'bold',
  },
})
