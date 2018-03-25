import isString from '../utilities'

export default () => (
  function alpha(value) {
    return {
      valid: isString(value) && (/^$|^[a-z]+$/i).test(value)
    }
  }
)
