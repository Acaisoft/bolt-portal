export const makeGetProxy = (obj, missingKeyHandler) =>
  new Proxy(obj, {
    get(target, name) {
      return name in target ? target[name] : missingKeyHandler(target, name)
    },
  })
