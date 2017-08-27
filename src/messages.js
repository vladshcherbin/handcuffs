import messages from './messages/en'
import { hasRules, hasNumericRules } from './rules'

// Replacers for message placeholders
const replacers = {
  between: (message, params) => message.replace(':min', params[0]).replace(':max', params[1]),
  max: (message, params) => message.replace(':max', params[0]),
  min: (message, params) => message.replace(':min', params[0])
}

// Get field type from field rules
function getFieldType(rules) {
  if (hasNumericRules(rules)) {
    return 'numeric'
  }

  if (hasRules(rules, ['array'])) {
    return 'array'
  }

  return 'string'
}

// Replace message placeholders
function replacePlaceholders(message, rule, params) {
  return replacers[rule]
    ? replacers[rule](message, params)
    : message
}

// Return error message
export default function formatErrorMessage(ruleTitle, ruleParams, fieldRules) {
  const definedMessage = messages[ruleTitle]

  if (definedMessage) {
    if (typeof definedMessage === 'object') {
      const fieldType = getFieldType(fieldRules)

      return replacePlaceholders(definedMessage[fieldType], ruleTitle, ruleParams)
    }

    return replacePlaceholders(definedMessage, ruleTitle, ruleParams)
  }

  return ruleTitle
}
