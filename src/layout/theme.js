export default {
  palette: {
    type: 'dark',
    actions: {
      hover: '#F76F40',
    },
    background: {
      default: '#24223B',
      paper: '#302F4C',
      striped: {
        odd: 'rgba(106, 104, 140, 0.24)',
        even: 'trasparent',
      },
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
    fontSize: 15,
    fontFamily: 'Montserrat, Arial, sans-serif',
    button: {
      textTransform: 'none',
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
    MuiTableCell: {
      root: {
        borderBottom: 'none',
      },
      head: {
        color: '#fff',
        fontWeight: 'bold',
      },
    },
  },
  props: {
    MuiButtonBase: {
      // disableRipple: true, // No more ripple, on the whole application!
    },
    DataTable: {
      striped: true,
    },
  },
}
