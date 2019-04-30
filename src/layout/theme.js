const spacingUnit = 8
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
    light: '#EB8967',
    main: '#F76F40',
  },
  error: {
    contrastText: '#FFFFFF',
    main: '#FF5EA1',
  },
  divider: '#343252',
  text: {
    primary: '#FFFFFF',
    secondary: '#CFCFEA',
  },
}

export default {
  spacing: {
    unit: spacingUnit,
  },
  palette,
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
  },
  mixins: {
    // Usage: scaledSpaceAround(2, 3, 4, 5) produces string: '16px 24px 32px 40px'.
    // You can provide any number of sides
    scaledSpaceAround: (...sideScales) =>
      sideScales.map(scale => `${scale * spacingUnit}px`).join(' '),
  },
}
