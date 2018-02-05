import { get, forEach } from 'dot-wild-tiny'
import { getValidationFunction, parseRules } from './rules'
import getValidationErrorMessage from './messages'

function validateValue(value, rules) {
  const rulesArray = parseRules(rules)
  let validationErrors = []

  rulesArray.forEach((rule) => {
    const validationFunction = getValidationFunction(rule)
    const valueIsValid = validationFunction(value)

    if (!valueIsValid) {
      validationErrors = [
        ...validationErrors,
        getValidationErrorMessage(rule)
      ]
    }
  })

  return validationErrors
}

function validateSingleValue(path, rules, data) {
  const errors = {}
  const value = get(data, path)
  const validationErrors = validateValue(value, rules)

  if (validationErrors.length) {
    errors[path] = validationErrors
  }

  return errors
}

function validateMultipleValues(path, rules, data) {
  const errors = {}

  forEach(data, path, (value, _, __, fullPath) => {
    const validationErrors = validateValue(value, rules)

    if (validationErrors.length) {
      errors[fullPath] = validationErrors
    }
  })

  return errors
}

function validateAttribute(attribute, rules, data) {
  if (attribute.includes('*')) {
    return validateMultipleValues(attribute, rules, data)
  }

  return validateSingleValue(attribute, rules, data)
}

export default function validate(data, rules) {
  let errors = {}

  Object.keys(rules).forEach((attribute) => {
    const attributeRules = rules[attribute]
    const attributeErrors = validateAttribute(attribute, attributeRules, data)

    if (Object.keys(attributeErrors).length) {
      errors = Object.assign({}, errors, attributeErrors)
    }
  })

  return errors
}
