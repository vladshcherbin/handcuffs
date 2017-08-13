export default function required(value) {
  if (value === undefined || value === null) {
    return false
  }

  if (Array.isArray(value) && !value.length) {
    return false
  }

  const convertedString = String(value).replace(/\s/g, '')

  return convertedString.length > 0
}
