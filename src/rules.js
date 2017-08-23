import accepted from './rules/accepted'
import alpha from './rules/alpha'
import alphaDash from './rules/alphaDash'
import alphaNum from './rules/alphaNum'
import array from './rules/array'
import boolean from './rules/boolean'
import min from './rules/min'
import numeric from './rules/numeric'
import required from './rules/required'
import string from './rules/string'

// Predefined rules
const validationRules = {
  accepted,
  alpha,
  alphaDash,
  alphaNum,
  array,
  boolean,
  min,
  numeric,
  required,
  string
}

const numericRules = ['numeric']

// Add a new rule
export function addRule(ruleTitle, ruleFunction) {
  if (validationRules[ruleTitle]) {
    throw new Error(`Validation rule "${ruleTitle}" already exists`)
  } else {
    validationRules[ruleTitle] = ruleFunction
  }
}

// Get defined rule
export function getRule(ruleTitle) {
  if (!validationRules[ruleTitle]) {
    throw new Error(`Validation rule "${ruleTitle}" doesn't exist`)
  } else {
    return validationRules[ruleTitle]
  }
}

// Check if rules array has any of provided rules
export function hasRules(rulesArray, rulesToFind) {
  const ruleTitlesArray = rulesArray.map(rule => rule.title)

  if (Array.isArray(rulesToFind)) {
    return rulesToFind.reduce((result, currentRuleToFind) => (
      result || ruleTitlesArray.includes(currentRuleToFind)
    ), false)
  }

  return ruleTitlesArray.includes(rulesToFind)
}

// Check if rules array has any of numeric rules
export function hasNumericRules(rulesArray) {
  return hasRules(rulesArray, numericRules)
}

// Check required params for a rule
export function requireParamsCount(count, params, rule) {
  if (!Array.isArray(params) || params.length < count) {
    throw new Error(`Validation rule "${rule}" requires at least ${count} parameters`)
  }
}

// Split rule title and params, located after ':', divided by ','
function extractRuleParams(rule) {
  const [ruleTitle, ruleParams] = rule.split(':')
  const params = ruleParams ? ruleParams.split(',') : []

  return {
    title: ruleTitle,
    params
  }
}

// Get array of rules from string, divided by '|'
function formatFieldRules(rules) {
  return rules.split('|').map(rule => extractRuleParams(rule))
}

// Parse provided array of string rules
export function formatRules(rules) {
  return Object.keys(rules).reduce((existingRules, field) => ({
    ...existingRules,
    [field]: formatFieldRules(rules[field])
  }), {})
}

// Get the size of the value, depending on the value type and rules
export function getSize(value, rules) {
  const hasNumericRule = hasNumericRules(rules)

  if (numeric(value) && hasNumericRule) {
    return value
  }

  if (Array.isArray(value)) {
    return value.length
  }

  return String(value).length
}
