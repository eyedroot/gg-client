export default function clipboardFromObject(data, callback = undefined) {
  navigator.clipboard.writeText(data)
    .then(() => {
      if (typeof callback === 'function') {
        callback()
      }
    })
    .catch((error) => {
      console.error('Failed to copy', error)
    })
}
