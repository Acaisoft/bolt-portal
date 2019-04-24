import accounting from 'accounting'

export const formatNumber = accounting.formatNumber

export const formatThousands = n => formatNumber(n, 0, ' ')
