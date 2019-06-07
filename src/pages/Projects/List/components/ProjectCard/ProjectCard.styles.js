import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, shape, spacing }) => {
  return {
    header: {
      alignItems: 'flex-start',
      maxWidth: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    chips: {
      display: 'flex',
    },
    chip: {
      padding: spacing(0.25, 1),
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      height: 'auto',
      borderRadius: shape.borderRadius,
      fontWeight: '600',

      '& + &': {
        marginLeft: spacing(1.5),
      },

      '& > span': {
        padding: 0,
      },
    },
    actions: {
      padding: `0 ${spacing(2) - 4}px`,
      justifyContent: 'flex-end',
    },
  }
})
