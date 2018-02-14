import get from 'dot-prop-wild'
import { getRuleValidationFunction, mandatoryRule, parseRules } from './rules'
import { formatErrorMessage } from './messages'

async function validateValue(value, rules) {
  const parsedRules = parseRules(rules)
  let errorMessage

  for (let i = 0; i < parsedRules.length; i += 1) {
    const rule = parsedRules[i]
    const ruleValidationFunction = getRuleValidationFunction(rule.title)

    if (mandatoryRule(rule.title, value)) {
      // eslint-disable-next-line no-await-in-loop
      const ruleValid = await ruleValidationFunction(value, rule.params)

      if (!ruleValid) {
        errorMessage = formatErrorMessage(rule, parsedRules)

        break
      }
    }
  }

  return errorMessage
}

async function validatePath(path, rules, data) {
  const value = get(data, path)
  const error = await validateValue(value.value, rules)

  return error
    ? { [value.path]: error }
    : null
}

async function validateWildcardPath(path, rules, data) {
  const values = get(data, path)
  const errors = await Promise.all(values.map(async (value) => {
    const error = await validateValue(value.value, rules)

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
  const errors = await Promise.all(Object.keys(rules).map(async (path) => {
    const pathRules = rules[path]

    const error = !path.includes('*')
      ? await validatePath(path, pathRules, data)
      : await validateWildcardPath(path, pathRules, data)

    return error || null
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
