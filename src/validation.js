import { formatRules, getRule } from './rules'
import formatErrorMessage from './messages'

// Validate value against rules, return errors array
function validateValue(value, rules) {
  return rules.reduce((existingErrors, rule) => {
    const { title, params } = rule
    const isValid = getRule(title)(value, params, rules)

    return !isValid
      ? [...existingErrors, formatErrorMessage(title, params, rules)]
      : existingErrors
  }, [])
}

// Validate fields against rules, return fields with an array of errors if found
function validateFields(fields, rules) {
  return Object.keys(fields).reduce((fieldsWithErrors, currentField) => {
    const fieldValue = fields[currentField]
    const fieldErrors = validateValue(fieldValue, rules)

    return fieldErrors.length
      ? { ...fieldsWithErrors, [currentField]: fieldErrors }
      : fieldsWithErrors
  }, {})
}

// Proceed the first part of field rules, return an object with fields and their values or errors
function proceedRuleFirstPart(partTitle, partRules, data, isLastPart) {
  if (partTitle === '*') {
    if (Array.isArray(data) && data.length) {
      return data.reduce((fields, value, valueIndex) => {
        const field = ({ [valueIndex]: value })

        return isLastPart
          ? { ...fields, ...validateFields(field, partRules) }
          : { ...fields, ...field }
      }, {})
    }

    return {}
  }

  const fieldValue = data ? data[partTitle] : undefined
  const field = ({ [partTitle]: fieldValue })

  return isLastPart ? validateFields(field, partRules) : field
}

// Proceed the rest part of field rules, return an object with fields and their values or errors
function proceedRuleRestPart(part, fields, rules, isLastPart) {
  const fieldsArray = Object.keys(fields)

  if (fieldsArray.length) {
    return fieldsArray.reduce((parsedFields, currentField) => {
      const currentFieldValue = fields[currentField]

      if (part === '*') {
        if (Array.isArray(currentFieldValue) && currentFieldValue.length) {
          return {
            ...parsedFields,
            ...currentFieldValue.reduce((parsedValues, currentValue, currentValueIndex) => {
              const field = ({ [`${currentField}.${currentValueIndex}`]: currentValue })

              return isLastPart
                ? { ...parsedValues, ...validateFields(field, rules) }
                : { ...parsedValues, ...field }
            }, {})
          }
        }

        return parsedFields
      }

      const fieldValue = currentFieldValue ? currentFieldValue[part] : undefined
      const field = ({ [`${currentField}.${part}`]: fieldValue })

      return isLastPart
        ? { ...parsedFields, ...validateFields(field, rules) }
        : { ...parsedFields, ...field }
    }, {})
  }

  return {}
}

// Split field by '.', return an object with fields and array of validation errors
function validateField(field, rules, data) {
  return field.split('.').reduce((fields, currentRulePart, partIndex, partArray) => {
    const isLastPart = partIndex === (partArray.length - 1)

    if (partIndex === 0) {
      return proceedRuleFirstPart(currentRulePart, rules, data, isLastPart)
    }

    return proceedRuleRestPart(currentRulePart, fields, rules, isLastPart)
  }, data)
}

// Validate data with rules, return an object with fields and their errors
export default function validate(data, rules = {}) {
  const parsedRules = formatRules(rules)

  const fieldsWithValues = Object.keys(parsedRules).reduce((fieldsWithErrors, currentField) => ({
    ...fieldsWithErrors,
    ...validateField(currentField, parsedRules[currentField], data)
  }), {})

  return fieldsWithValues
}
