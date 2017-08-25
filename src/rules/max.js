import { getSize, requireParamsCount } from '../rules'

export default function max(value, params, rules) {
  requireParamsCount(1, params, 'max')

  const size = getSize(value, rules)

  return size <= params[0]
}
