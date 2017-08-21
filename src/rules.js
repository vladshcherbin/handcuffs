import accepted from './rules/accepted'
import array from './rules/array'
import boolean from './rules/boolean'
import required from './rules/required'
import string from './rules/string'

// Predefined rules
const validationRules = {
  accepted,
  array,
  boolean,
  required,
  string
}

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
