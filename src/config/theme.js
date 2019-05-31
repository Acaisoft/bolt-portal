const palette = {
  type: 'dark',
  actions: {
    hover: '#F76F40',
  },
  action: {
    selected: '#816DFE',
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
      fill: '#CFCFEA', // Some components use 'fill', some use 'color'...
      fontFamily: 'Montserrat',
      fontSize: 15,
    },
    tooltip: {
      color: '#333',
      fontFamily: 'Montserrat',
      fontSize: 15,
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
  success: {
    contrastText: '#FFFFFF',
    main: '#1EB1B1',
  },
  warning: {
    contrastText: '#FFFFFF',
    main: '#F76F40',
  },
  error: {
    contrastText: '#FFFFFF',
    main: '#EB6767',
  },
  info: {
    contrastText: '#FFFFFF',
    main: '#7297FF',
  },
  divider: '#343252',
  text: {
    primary: '#FFFFFF',
    secondary: '#CFCFEA',
    error: '#FF5EA1',
    success: '#1EB1B1',
    warning: '#EB8967',
    icon: '#A7A7C5',
  },
}

export default {
  palette,
  typography: {
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
        backgroundColor: palette.background.paper,
        color: palette.text.primary,
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
        paddingTop: 4,
        paddingBottom: 4,
      },
      head: {
        color: palette.text.primary,
        fontWeight: 'bold',
      },
      footer: {
        color: palette.text.primary,
        fontWeight: 'bold',
      },
      body: {
        color: palette.text.secondary,
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
    MuiInputBase: {
      autoComplete: 'off',
    },
  },
}
