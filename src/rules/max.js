import { getValueSize } from '../rules'

export default (param) => {
  if (!param) {
    throw new Error('max rule param was not set')
  }

  return function max(value, rules) {
    const valueSize = getValueSize(value, rules)

    return {
      valid: valueSize <= param,
      params: { max: param }
    }
  }
}
