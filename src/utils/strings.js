export const trimText = (text, length, fill = '...') =>
  text.length > length ? `${text.slice(0, length - fill.length)}${fill}` : text
