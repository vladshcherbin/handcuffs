import isString from '../utilities'

export default () => (
  function string(value) {
    return {
      valid: isString(value)
    }
  }
)
