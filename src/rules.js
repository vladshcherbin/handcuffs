import isNumber from 'is-number'
import { addMessage } from './messages'
import accepted from './rules/accepted'
import alpha from './rules/alpha'
import alphaNum from './rules/alphaNum'
import alphaNumDash from './rules/alphaNumDash'
import array from './rules/array'
import between from './rules/between'
import boolean from './rules/boolean'
import email from './rules/email'
import max from './rules/max'
import min from './rules/min'
import numeric from './rules/numeric'
import required from './rules/required'
import slug from './rules/slug'
import string from './rules/string'

const validationRules = {
  accepted,
  alpha,
  alphaNum,
  alphaNumDash,
  array,
  between,
  boolean,
  email,
  max,
  min,
  numeric,
  required,
  slug,
  string
}

const numericRules = ['numeric']
const mandatoryRules = ['accepted', 'required']

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

function mandatoryRule(rule, value) {
  if (mandatoryRules.includes(rule.name)) {
    return true
  }

  return value !== undefined
}

function rulesContain(rules, rulesToFind) {
  if (Array.isArray(rulesToFind)) {
    let ruleWasFound = false

    for (let i = 0; i < rulesToFind.length; i += 1) {
      if (rules.includes(rulesToFind[i])) {
        ruleWasFound = true

        break
      }
    }

    return ruleWasFound
  }

  return rules.includes(rulesToFind)
}

function rulesContainNumericRules(rules) {
  return rulesContain(rules, numericRules)
}

function getRuleValueType(rules) {
  if (rulesContainNumericRules(rules)) {
    return 'numeric'
  }

  if (rulesContain(rules, 'array')) {
    return 'array'
  }

  return 'string'
}

function getValueSize(value, rules) {
  if (isNumber(value) && rulesContainNumericRules(rules)) {
    return Number(value)
  }

  if (Array.isArray(value)) {
    return value.length
  }

  return String(value).trim().length
}

export {
  getRuleValueType,
  getValueSize,
  mandatoryRule,
  validationRules as rules
}
