import { addMessage } from './messages'
import accepted from './rules/accepted'
import alpha from './rules/alpha'
import alphaNum from './rules/alphaNum'
import alphaNumDash from './rules/alphaNumDash'
import array from './rules/array'
import between from './rules/between'
import boolean from './rules/boolean'
import max from './rules/max'
import min from './rules/min'
import numeric from './rules/numeric'
import required from './rules/required'
import string from './rules/string'

const validationRules = {
  accepted,
  alpha,
  alphaNum,
  alphaNumDash,
  array,
  between,
  boolean,
  max,
  min,
  numeric,
  required,
  string
}

const numericRules = ['numeric']

export function addRule(title, ruleFunction, message) {
  if (!title || !ruleFunction || !message) {
    throw new Error('No title, function or message was provided for custom rule')
  }

  if (validationRules[title]) {
    throw new Error(`Validation rule '${title}' already exists`)
  }

  validationRules[title] = ruleFunction

  addMessage(title, message)
}

export function parseRules(rules) {
  return rules.split('|').map((rule) => {
    const [title, params] = rule.split(':')

    return {
      title,
      params: params ? params.split(',') : []
    }
  })
}

export function getRuleValidationFunction(rule) {
  const validationFunction = validationRules[rule]

  if (!validationFunction) {
    throw new Error(`No validation function was defined for '${rule}' rule`)
  }

  return validationFunction
}

function rulesContain(rules, rulesToFind) {
  const ruleTitlesArray = rules.map(rule => rule.title)

  if (Array.isArray(rulesToFind)) {
    let ruleWasFound = false

    for (let i = 0; i < rulesToFind.length; i += 1) {
      if (ruleTitlesArray.includes(rulesToFind[i])) {
        ruleWasFound = true

        break
      }
    }

    return ruleWasFound
  }

  return ruleTitlesArray.includes(rulesToFind)
}

function rulesContainNumericRules(rules) {
  return rulesContain(rules, numericRules)
}

export function getRuleValueType(rules) {
  if (rulesContainNumericRules(rules)) {
    return 'numeric'
  }

  if (rulesContain(rules, 'array')) {
    return 'array'
  }

  return 'string'
}

export function checkRuleParamsCount(params, requiredParamsCount, rule) {
  if (!Array.isArray(params) || params.length < requiredParamsCount) {
    throw new Error(`'${rule}' rule requires at least ${requiredParamsCount} parameters`)
  }
}

export function getValueSize(value, rules) {
  if (numeric(value) && rules && rulesContainNumericRules(rules)) {
    return Number(value)
  }

  if (Array.isArray(value)) {
    return value.length
  }

  return String(value).trim().length
}
