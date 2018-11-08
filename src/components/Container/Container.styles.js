export default theme => ({
  root: {
    width: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.up('lg')]: {
      width: theme.breakpoints.values.lg,
    },

    [theme.breakpoints.between('md', 'lg')]: {
      width: theme.breakpoints.values.md,
    },
  },
})
