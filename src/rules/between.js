import { getValueSize } from '../rules'

export default (min, max) => {
  if (!min) {
    throw new Error('between rule "min" param was not set')
  }

  if (!max) {
    throw new Error('between rule "max" param was not set')
  }

  return function between(value, rules) {
    const valueSize = getValueSize(value, rules)

    return {
      valid: valueSize >= min && valueSize <= max,
      params: { min, max }
    }
  }
}
