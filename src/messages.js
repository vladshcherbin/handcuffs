import pupa from 'pupa'
import messages from './messages/en'
import { getRuleValueType } from './rules'

export function addMessage(title, message) {
  messages[title] = message
}

export function formatErrorMessage(rule, params = {}, rules) {
  const errorMessage = messages[rule]

  if (!errorMessage) {
    throw new Error(`There is no defined error message for '${rule}' rule`)
  }

  if (!rules) {
    throw new Error('All rules were not passed')
  }

  if (typeof errorMessage === 'object') {
    const ruleValueType = getRuleValueType(rules)

    return pupa(errorMessage[ruleValueType], params)
  }

  return pupa(errorMessage, params)
}
