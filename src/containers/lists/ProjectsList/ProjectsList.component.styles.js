export default ({ palette, shape, spacing, typography }) => {
  return {
    card: {
      height: '100%',
      padding: spacing.unit * 2,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: shape.borderRadius * 2,
    },
    cardHeader: {
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
    gridContainer: {
      // Fallback for browsers not supporting CSS grid.
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 auto',

      // For browsers supporting grid.
      '&': {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      },
    },
    gridItem: {
      flex: '1 1 250px',
      margin: spacing.unit,
    },
    gridItemBig: {
      flexBasis: '100%',
      gridRowEnd: 'span 2',
      gridColumnEnd: 'span 2',
    },
    formCard: {
      border: '2px dashed white',
      backgroundColor: 'transparent',
    },
    newProjectContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      height: '100%',
    },
    newProjectContent: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    newProjectActions: {
      justifyContent: 'center',
    },
  }
}
