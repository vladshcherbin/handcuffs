import { checkRuleParams, getValueSize } from '../rules'

export default function min(value, params, rules) {
  checkRuleParams(params, 1, 'min')

  const valueSize = getValueSize(value, rules)

  return valueSize >= params[0]
}
