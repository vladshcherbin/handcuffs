import {
  addRule,
  getRuleValueType,
  getValueSize,
  mandatoryRule,
  rules
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
    const customRuleFunction = () => function custom() { return false }

    addRule('custom', customRuleFunction, 'Custom rule message')

    expect(rules.custom).toEqual(customRuleFunction)
  })

  test('should pass \'required\' mandatory rule with value', () => {
    expect(mandatoryRule(rules.required(), '')).toEqual(true)
  })

  test('should pass \'required\' mandatory rule without value', () => {
    expect(mandatoryRule(rules.required())).toEqual(true)
  })

  test('should pass mandatory rule with value', () => {
    expect(mandatoryRule(rules.string(), '')).toEqual(true)
  })

  test('should pass mandatory rule without value', () => {
    expect(mandatoryRule(rules.string())).toEqual(false)
  })

  test('should detect numeric value type', () => {
    expect(getRuleValueType(['required', 'numeric', 'min'])).toEqual('numeric')
  })

  test('should detect array value type', () => {
    expect(getRuleValueType(['required', 'array', 'min'])).toEqual('array')
  })

  test('should detect string value type', () => {
    expect(getRuleValueType(['required', 'min'])).toEqual('string')
  })

  test('should detect string value size', () => {
    expect(getValueSize('ab3', ['required', 'min'])).toEqual(3)
  })

  test('should detect numeric string value size without numeric rules', () => {
    expect(getValueSize('12', ['required', 'min'])).toEqual(2)
  })

  test('should detect numeric string value size with numeric rules', () => {
    expect(getValueSize('12', ['required', 'numeric', 'min'])).toEqual(12)
  })

  test('should detect number value size without numeric rules', () => {
    expect(getValueSize(15, ['required', 'min'])).toEqual(2)
  })

  test('should detect number value size with numeric rules', () => {
    expect(getValueSize(15, ['required', 'numeric', 'min'])).toEqual(15)
  })

  test('should detect empty array size', () => {
    expect(getValueSize([], ['required', 'min'])).toEqual(0)
  })

  test('should detect non-empty array size', () => {
    expect(getValueSize(['Jack'], ['required', 'min'])).toEqual(1)
  })
})
