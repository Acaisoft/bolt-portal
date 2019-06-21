import { makeStyles } from '@material-ui/core'

export default makeStyles(({ palette, spacing }) => ({
  root: {
    width: 'auto',
    padding: spacing(2, 2, 1),
    color: palette.chart.tooltip.color,
    fontFamily: palette.chart.tooltip.fontFamily,
    fontSize: palette.chart.tooltip.fontSize,
    backgroundColor: [palette.chart.tooltip.fill, '!important'],
  },
  label: {},
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexBasis: '30%',
    flexGrow: 1,
    margin: spacing(1),
  },
  itemColor: {
    borderRadius: '50%',
    width: 5,
    height: 5,
    marginRight: spacing(1),
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemValue: {
    width: '100%',
    marginLeft: spacing(1) + 5,
  },
}))
