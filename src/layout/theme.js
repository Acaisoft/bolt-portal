export default {
  palette: {
    background: {
      default: '#fff',
    },
    primary: {
      main: '#222046',
    },
    violet: {
      100: '#9890E6',
      200: '#928DF6',
      300: '#7B73CE',
    },
    blue: {
      100: '#7790FB',
      200: '#7275E4',
      300: '#7175DC',
    },
    gray: {
      default: '#E8E8E8',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
    body2: {
      fontWeight: 'bold',
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application!
    },
  },
}
