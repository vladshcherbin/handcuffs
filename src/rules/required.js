export default () => (
  function required(value) {
    if (value === undefined || value === null) {
      return {
        valid: false
      }
    }

    if (Array.isArray(value) && !value.length) {
      return {
        valid: false
      }
    }

    const convertedString = String(value).replace(/\s/g, '')

    return {
      valid: convertedString.length > 0
    }
  }
)
