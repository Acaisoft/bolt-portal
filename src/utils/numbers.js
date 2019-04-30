import accounting from 'accounting'

export const formatNumber = accounting.formatNumber

export const formatThousands = n => formatNumber(n, 0, ' ')
export const formatPercent = n => `${formatNumber(n * 100.0, 2)}%`
