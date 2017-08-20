// Proceed the first part of field rules, return object with fields and their values or errors
function proceedRuleFirstPart(partTitle, partRules, data, isLastPart) {
  if (partTitle === '*') {
    if (Array.isArray(data) && data.length) {
      return data.reduce((fields, value, valueIndex) => ({
        ...fields,
        [valueIndex]: value // validate value
      }), {})
    }

    return {}
  }

  return { [partTitle]: data ? data[partTitle] : undefined } // validate value
}

// Proceed the rest part of field rules, return object with fields and their values or errors
function parseRuleRestPart(part, fields, isLastPart) {
  const fieldsArray = Object.keys(fields)

  if (fieldsArray.length) {
    return fieldsArray.reduce((parsedFields, currentField) => {
      const currentFieldValue = fields[currentField]

      if (part === '*') {
        if (Array.isArray(currentFieldValue) && currentFieldValue.length) {
          return {
            ...parsedFields,
            ...currentFieldValue.reduce((parsedValues, currentValue, currentValueIndex) => ({
              ...parsedValues,
              [`${currentField}.${currentValueIndex}`]: currentValue // validate value
            }), {})
          }
        }

        return parsedFields
      }

      return {
        ...parsedFields,
        [`${currentField}.${part}`]: currentFieldValue ? currentFieldValue[part] : undefined // validate value
      }
    }, {})
  }

  return {}
}

// Split field by '.', return object with fields and array of validation errors
function validateField(field, rules, data) {
  return field.split('.').reduce((fields, currentRulePart, partIndex, partArray) => {
    const isLastPart = partIndex === (partArray.length - 1)

    if (partIndex === 0) {
      return proceedRuleFirstPart(currentRulePart, rules, data, isLastPart)
    }

    return parseRuleRestPart(currentRulePart, fields, isLastPart)
  }, data)
}

// Validate data with rules, return object with fields and their errors
export default function validate(data, rules) {
  const fieldsWithValues = Object.keys(rules).reduce((fieldsWithErrors, currentField) => ({
    ...fieldsWithErrors,
    ...validateField(currentField, rules[currentField], data)
  }), {})

  console.log(fieldsWithValues)
}
