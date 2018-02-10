import { checkRuleParamsCount, getValueSize } from '../rules'

export default function between(value, params, rules) {
  checkRuleParamsCount(params, 2, 'between')

  const valueSize = getValueSize(value, rules)

  return valueSize >= params[0] && valueSize <= params[1]
}
