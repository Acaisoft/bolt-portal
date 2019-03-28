export default {
  palette: {
    type: 'dark',
    actions: {
      hover: '#F76F40',
    },
    background: {
      default: '#24223B',
      paper: '#302F4C',
    },
    primary: {
      light: '#302F4C',
      dark: '#F76F40',
      main: '#735DFC',
    },
    secondary: {
      main: '#1EB1B1',
      contrastText: '#ffffff',
    },
    divider: '#343252',
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    },
    body2: {
      fontWeight: 'bold',
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        backgroundColor: '#302F4C',
        color: '#ffffff',
        boxShadow: 'none',
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    MuiFilledInput: {
      underline: {
        '&:after': {
          borderBottomColor: '#A192FF',
        },
        '&:before': {
          borderBottomColor: 'transparent',
        },
      },
    },
  },
  props: {
    MuiButtonBase: {
      // disableRipple: true, // No more ripple, on the whole application!
    },
  },
}
