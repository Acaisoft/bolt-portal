export default ({ palette, shape, spacing }) => {
  const spaceAround = (...sideScales) =>
    sideScales.map(scale => `${scale * spacing.unit}px`).join(' ')

  return {
    downIcon: {
      right: spacing.unit,
    },
    select: {
      borderRadius: shape.borderRadius,
      backgroundColor: palette.primary.light,
      padding: spaceAround(2, 5, 2, 2),
      display: 'flex',
      alignItems: 'center',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      padding: spaceAround(2.5, 3),
    },
    itemIcon: {
      marginRight: spacing.unit * 2,
    },
    divider: {
      backgroundColor: '#56557D',
    },
  }
}
