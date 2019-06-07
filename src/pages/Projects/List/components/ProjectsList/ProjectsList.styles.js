import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, shape, spacing, typography }) => {
  return {
    card: {
      minHeight: 250,
      justifyContent: 'center',
      height: '100%',
      padding: spacing(3, 3, 4),
      display: 'flex',
      flexDirection: 'column',
      borderRadius: shape.borderRadius * 2,
      position: 'relative',
      flexGrow: 1,
      '& > *': {
        zIndex: 1,
      },
    },
    gridContainer: {
      // Fallback for browsers not supporting CSS grid.
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 auto',

      // For browsers supporting grid.
      '&': {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
      },
    },
    gridItem: {
      flex: '1 1 250px',
      margin: spacing(1),
    },
    gridItemBig: {
      flexBasis: '100%',
      gridRowEnd: 'span 2',
      gridColumnEnd: 'span 2',
    },
    formCard: {
      border: `2px dashed ${palette.border}`,
      backgroundColor: 'transparent',
    },
    newProjectContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
  }
})
