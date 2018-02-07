import { checkRuleParams, getValueSize } from '../rules'

export default function between(value, params, rules) {
  checkRuleParams(params, 2, 'between')

  const valueSize = getValueSize(value, rules)

  return valueSize >= params[0] && valueSize <= params[1]
}
