import isNumber from 'is-number'
import isString from '../utilities'

export default () => (
  function alphaNumDash(value) {
    return {
      valid: (isString(value) || isNumber(value)) && (/^$|^[a-z0-9_-]+$/i).test(value)
    }
  }
)
