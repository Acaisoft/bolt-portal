const spacingUnit = 8

export default {
  spacing: {
    unit: spacingUnit,
  },
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
    chart: {
      gridLine: {
        color: '#535273',
        dash: '5 5',
      },
      font: {
        color: '#CFCFEA',
      },
      color: {
        area: {
          success: '#1EB1B1',
          error: '#FF5EA1',
          primary: '#735DFC',
          secondary: '#EB8967',
        },
        line: {
          success: '#1EB1B1',
          error: '#FF5EA1',
          primary: '#7297FF',
        },
      },
    },
    primary: {
      light: '#302F4C',
      dark: '#F76F40',
      main: '#735DFC',
    },
    secondary: {
      main: '#1EB1B1',
      contrastText: '#FFFFFF',
    },
    divider: '#343252',
    text: {
      primary: '#FFFFFF',
      secondary: '#CFCACA',
    },
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
        color: '#FFFFFF',
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
    MuiTooltip: {
      popper: {
        opacity: 1,
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
    MuiPaper: {
      elevation: 0,
    },
  },
  mixins: {
    // Usage: scaledSpaceAround(2, 3, 4, 5) produces string: '16px 24px 32px 40px'.
    // You can provide any number of sides
    scaledSpaceAround: (...sideScales) =>
      sideScales.map(scale => `${scale * spacingUnit}px`).join(' '),
  },
}
