import isNumber from 'is-number'
import isString from '../utilities'

export default () => (
  function alphaNum(value) {
    return {
      valid: (isString(value) || isNumber(value)) && (/^$|^[a-z0-9]+$/i).test(value)
    }
  }
)
