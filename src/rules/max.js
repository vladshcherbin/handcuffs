import { checkRuleParamsCount, getValueSize } from '../rules'

export default function min(value, params, rules) {
  checkRuleParamsCount(params, 1, 'max')

  const valueSize = getValueSize(value, rules)

  return valueSize <= params[0]
}
