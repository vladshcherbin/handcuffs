import {
  addRule,
  checkRuleParamsCount,
  getRuleValidationFunction,
  getRuleValueType,
  getValueSize,
  parseRules
} from '../src/rules'

describe('Rules', () => {
  test('should throw when new rule has no title', () => {
    expect(() => addRule(undefined, () => false, 'Custom rule message'))
      .toThrow('No title, function or message was provided for custom rule')
  })

  test('should throw when new rule has no function', () => {
    expect(() => addRule('fake', undefined, 'Custom rule message'))
      .toThrow('No title, function or message was provided for custom rule')
  })

  test('should throw when new rule has no message', () => {
    expect(() => addRule('fake', () => false, undefined))
      .toThrow('No title, function or message was provided for custom rule')
  })

  test('should throw when rule already exists', () => {
    expect(() => addRule('required', () => {}, 'Custom rule message'))
      .toThrow('Validation rule \'required\' already exists')
  })

  test('should add new rule', () => {
    const customRuleFunction = () => false

    addRule('custom', customRuleFunction, 'Custom rule message')

    expect(getRuleValidationFunction('custom')).toEqual(customRuleFunction)
  })

  test('should parse single rule', () => {
    expect(parseRules('required')).toEqual([{ title: 'required', params: [] }])
  })

  test('should parse single rule with single param', () => {
    expect(parseRules('age:18')).toEqual([{ title: 'age', params: ['18'] }])
  })

  test('should parse single rule with multiple params', () => {
    expect(parseRules('between:2,7')).toEqual([{ title: 'between', params: ['2', '7'] }])
  })

  test('should parse multiple rules', () => {
    expect(parseRules('required|between:2,7')).toEqual([
      { title: 'required', params: [] },
      { title: 'between', params: ['2', '7'] }
    ])
  })

  test('should not throw when validation function for rule is defined', () => {
    expect(() => getRuleValidationFunction('required')).not.toThrow()
  })

  test('should throw when validation function for rule is not defined', () => {
    expect(() => getRuleValidationFunction('fake'))
      .toThrow('No validation function was defined for \'fake\' rule')
  })

  test('should detect numeric value type', () => {
    expect(getRuleValueType(parseRules('required|numeric|min:3'))).toEqual('numeric')
  })

  test('should detect array value type', () => {
    expect(getRuleValueType(parseRules('required|array|min:3'))).toEqual('array')
  })

  test('should detect string value type', () => {
    expect(getRuleValueType(parseRules('required|min:3'))).toEqual('string')
  })

  test('should not throw when rule params count is enough', () => {
    expect(() => checkRuleParamsCount([1, 3], 2, 'between')).not.toThrow()
  })

  test('should throw when rule params count is not enough', () => {
    expect(() => checkRuleParamsCount([1], 2, 'between'))
      .toThrow('\'between\' rule requires at least 2 parameters')
  })

  test('should detect string value size', () => {
    expect(getValueSize('ab3', parseRules('required|min:3'))).toEqual(3)
  })

  test('should detect numeric string value size without numeric rules', () => {
    expect(getValueSize('12', parseRules('required|min:3'))).toEqual(2)
  })

  test('should detect numeric string value size with numeric rules', () => {
    expect(getValueSize('12', parseRules('required|numeric|min:3'))).toEqual(12)
  })

  test('should detect number value size without numeric rules', () => {
    expect(getValueSize(15, parseRules('required|min:3'))).toEqual(2)
  })

  test('should detect number value size with numeric rules', () => {
    expect(getValueSize(15, parseRules('required|numeric|min:3'))).toEqual(15)
  })

  test('should detect empty array size', () => {
    expect(getValueSize([], parseRules('required|min:3'))).toEqual(0)
  })

  test('should detect non-empty array size', () => {
    expect(getValueSize(['Jack'], parseRules('required|min:3'))).toEqual(1)
  })
})
