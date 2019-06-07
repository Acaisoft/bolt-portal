import accounting from 'accounting'

export const formatNumber = accounting.formatNumber

export const formatThousands = (n, precision = 0) => formatNumber(n, precision, ' ')
export const formatPercent = (n, precision = 2) =>
  `${formatNumber(n * 100.0, precision)}%`
