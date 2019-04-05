export default ({ palette, shape, spacing, mixins }) => {
  return {
    downIcon: {
      right: spacing.unit,
    },
    select: {
      borderRadius: shape.borderRadius,
      backgroundColor: palette.primary.light,
      padding: mixins.scaledSpaceAround(2, 5, 2, 2),
      display: 'flex',
      alignItems: 'center',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      padding: mixins.scaledSpaceAround(2.5, 3),
    },
    itemIcon: {
      marginRight: spacing.unit * 2,
    },
    divider: {
      backgroundColor: '#56557D',
    },
  }
}
