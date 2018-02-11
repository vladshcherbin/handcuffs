import messages from './messages/en'
import { getRuleValueType } from './rules'

const replacers = {
  between: (message, params) => message.replace(':min', params[0]).replace(':max', params[1]),
  max: (message, params) => message.replace(':max', params[0]),
  min: (message, params) => message.replace(':min', params[0])
}

export function addMessage(title, message) {
  messages[title] = message
}

function replacePlaceholders(message, title, params) {
  const replacerFunction = replacers[title]

  return replacerFunction
    ? replacerFunction(message, params)
    : message
}

export function formatErrorMessage(rule, rules) {
  const { title, params } = rule
  const errorMessage = messages[title]

  if (!errorMessage) {
    throw new Error(`There is no defined error message for '${title}' rule`)
  }

  if (!rules) {
    throw new Error('All rules were not passed')
  }

  if (typeof errorMessage === 'object') {
    const ruleValueType = getRuleValueType(rules)

    return replacePlaceholders(errorMessage[ruleValueType], title, params)
  }

  return replacePlaceholders(errorMessage, title, params)
}
