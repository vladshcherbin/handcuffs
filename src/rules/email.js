import isString from '../utilities'

export default () => (
  function email(value) {
    return {
      valid: isString(value) && (/^$|^.+@.+$/).test(value)
    }
  }
)
