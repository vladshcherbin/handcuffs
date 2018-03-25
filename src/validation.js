/* eslint-disable no-await-in-loop */
import get from 'dot-prop-wild'
import { mandatoryRule } from './rules'
import { formatErrorMessage } from './messages'

async function validateValue({ value }, rules) {
  const ruleNames = rules.map(rule => rule.name)
  let errorMessage

  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i]

    if (mandatoryRule(rule, value)) {
      const { valid, params } = await rule(value, ruleNames)

      if (!valid) {
        errorMessage = formatErrorMessage(rule.name, params, ruleNames)

        break
      }
    }
  }

  return errorMessage
}

async function validatePath(path, rules, data) {
  const value = get(data, path)
  const error = await validateValue(value, rules)

  return error
    ? { [value.path]: error }
    : null
}

async function validateWildcardPath(path, rules, data) {
  const values = get(data, path)
  const errors = await Promise.all(values.map(async (value) => {
    const error = await validateValue(value, rules)

    return error
      ? { [value.path]: error }
      : null
  }))
  const filteredErrors = errors.filter(error => error)

  return filteredErrors.length > 0
    ? Object.assign({}, ...filteredErrors)
    : null
}

async function validateData(data, rules) {
  const rulesArray = Object.keys(rules)

  if (!rulesArray.length) {
    return []
  }

  const errors = await Promise.all(rulesArray.map(async (path) => {
    const pathRules = rules[path]

    return !path.includes('*')
      ? validatePath(path, pathRules, data)
      : validateWildcardPath(path, pathRules, data)
  }))

  return errors.filter(error => error)
}

export default async function validate(data, rules) {
  if (!data) {
    throw new Error('No data for validation was provided')
  }

  if (!rules) {
    throw new Error('No validation rules were provided')
  }

  const errors = await validateData(data, rules)

  return {
    valid: errors.length === 0,
    errors: Object.assign({}, ...errors)
  }
}
