import isNumber from 'is-number'

export default () => (
  function numeric(value) {
    return {
      valid: isNumber(value)
    }
  }
)
