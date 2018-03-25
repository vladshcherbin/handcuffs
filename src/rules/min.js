import { getValueSize } from '../rules'

export default (param) => {
  if (!param) {
    throw new Error('min rule param was not set')
  }

  return function min(value, rules) {
    const valueSize = getValueSize(value, rules)

    return {
      valid: valueSize >= param,
      params: { min: param }
    }
  }
}
