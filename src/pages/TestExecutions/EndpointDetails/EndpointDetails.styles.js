import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, spacing, typography }) => {
  return {
    tile: {
      padding: spacing(5),
      height: '100%',
      maxHeight: 500,
    },
    tileContent: {
      padding: spacing(4, 0, 2),
    },
    verticalGrid: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
    },
    verticalGridItem: {
      '& + &': {
        marginTop: spacing(2),
      },
    },
  }
})
