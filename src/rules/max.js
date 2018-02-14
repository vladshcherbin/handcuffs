import { checkRuleParamsCount, getValueSize } from '../rules'

export default function max(value, params, rules) {
  checkRuleParamsCount(params, 1, 'max')

  const valueSize = getValueSize(value, rules)

  return valueSize <= params[0]
}
