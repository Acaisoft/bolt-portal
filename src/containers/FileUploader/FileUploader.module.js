import CryptoJS from 'crypto-js'

export const readFile = async (file, mode = 'binary-string') => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target.result)
    reader.onerror = e => reject(e.target.error)

    switch (mode) {
      case 'binary-string':
        reader.readAsBinaryString(file)
        break
      case 'data-url':
        reader.readAsDataURL(file)
        break
      default:
    }
  })
}

export const uploadFileToGCS = async ({ file, url, fileHash }) => {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
      'Content-MD5': fileHash,
    },
    body: file,
  })

  if (res.status >= 400) {
    let errorBody
    try {
      errorBody = await res.text() // GCS responds with XML. TODO: Parse message
    } catch (ex) {
      errorBody = 'Unknown error'
    }
    throw new Error('File upload failed:', errorBody)
  }
  return res
}

export const getFileHash = async loadedFile => {
  const latinContents = CryptoJS.enc.Latin1.parse(loadedFile)
  const md5 = CryptoJS.MD5(latinContents)
  return md5.toString(CryptoJS.enc.Base64)
}
