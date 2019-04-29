export default ({ shape, spacing }) => {
  return {
    header: {
      alignItems: 'flex-start',
    },
    grow: {
      flexGrow: 1,
    },
    chips: {
      display: 'flex',
    },
    chip: {
      padding: `${spacing.unit * 0.25}px ${spacing.unit}px`,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      height: 'auto',
      borderRadius: shape.borderRadius,

      '& + &': {
        marginLeft: spacing.unit * 1.5,
      },

      '& > span': {
        padding: 0,
      },
    },
    actions: {
      padding: `0 ${spacing.unit * 2 - 4}px ${spacing.unit}px`,
      justifyContent: 'flex-end',
    },
  }
}
