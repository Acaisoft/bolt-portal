export default ({ palette, mixins, spacing, typography }) => {
  return {
    tile: {
      padding: mixins.scaledSpaceAround(5, 5),
      height: '100%',
      maxHeight: 500,
    },
    tileContent: {
      padding: mixins.scaledSpaceAround(4, 0, 2),
    },
    verticalGrid: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
    },
    verticalGridItem: {
      '& + &': {
        marginTop: spacing.unit * 2,
      },
    },
  }
}
