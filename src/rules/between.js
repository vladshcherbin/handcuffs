import { getSize, requireParamsCount } from '../rules'

export default function between(value, params, rules) {
  requireParamsCount(2, params, 'between')

  const size = getSize(value, rules)

  return size >= params[0] && size <= params[1]
}
