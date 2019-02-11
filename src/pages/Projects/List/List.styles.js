import AcaiBoltImg from '~assets/images/img.png'

export default ({ palette, spacing, typography }) => {
  return {
    root: {
      flexGrow: 1,
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: 20,
    },
    card: {
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      '&::after': {
        content: "''",
        background: `url(${AcaiBoltImg})`,
        opacity: 0.2,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    },
    editIcon: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      zIndex: 100,
    },
  }
}
