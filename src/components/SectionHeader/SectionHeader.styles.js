export default ({ palette, spacing, typography }) => ({
  marginBottom: {
    marginBottom: spacing.unit * 3,
  },
  description: {
    ...typography.subtitle1,
    fontWeight: 'normal',
  },
  subtitle: {
    ...typography.h3,
    fontWeight: 'normal',
    marginLeft: spacing.unit,
    color: palette.text.secondary,
  },
  title: {
    ...typography.h2,
    fontWeight: 'bold',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  large: {
    '& $title': {
      fontSize: '1.8rem',
    },
    '& $subtitle': {
      fontSize: '1.8rem',
    },
    '& $description': {
      fontSize: '1.3rem',
    },
  },
  medium: {
    '& $title': {
      fontSize: '1.5rem',
    },
    '& $subtitle': {
      fontSize: '1.5rem',
    },
    '& $description': {
      fontSize: '1rem',
    },
  },
  small: {
    '& $title': {
      fontSize: '1rem',
    },
    '& $subtitle': {
      fontSize: '1rem',
    },
    '& $description': {
      fontSize: '0.85rem',
    },
  },
})
