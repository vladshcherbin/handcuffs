import isString from '../utilities'

export default () => (
  function slug(value) {
    return {
      valid: isString(value) && (/^$|^[a-z0-9]+(?:-[a-z0-9]+)*$/).test(value)
    }
  }
)
