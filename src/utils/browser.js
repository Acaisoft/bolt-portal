export const copyValueToClipboard = value => {
  const el = document.createElement('textarea')
  el.value = value
  document.body.appendChild(el)

  copyValueFromInput(el)

  document.body.removeChild(el)
}

export const copyValueFromInput = el => {
  el.select()
  document.execCommand('copy')
}
