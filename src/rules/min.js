import { getSize, requireParamsCount } from '../rules'

export default function min(value, params, rules) {
  requireParamsCount(1, params, 'min')

  const size = getSize(value, rules)

  return size >= params[0]
}
