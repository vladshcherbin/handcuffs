import {
  addRule,
  formatRules,
  getRule,
  getSize,
  hasRules,
  hasNumericRules,
  requireParamsCount
} from '../src/rules'

describe('Validation rules', () => {
  test('should add new validation rule', () => {
    addRule('custom', () => false)

    expect(getRule('custom')).toBeInstanceOf(Function)
  })

  test('should throw error if validation rule doesn\'t exist', () => {
    expect(() => {
      getRule('fake-rule')
    }).toThrowError('Validation rule "fake-rule" doesn\'t exist')
  })

  test('should throw error if validation rule already exists', () => {
    expect(() => {
      addRule('custom', () => false)
    }).toThrowError('Validation rule "custom" already exists')
  })

  test('should throw error if rule params count is not enough', () => {
    expect(() => {
      requireParamsCount(2, [1], 'between')
    }).toThrowError('Validation rule "between" requires at least 2 parameters')
  })

  test('should not throw error if rule params count is enough', () => {
    expect(() => {
      requireParamsCount(2, [1, 5], 'between')
    }).not.toThrowError('Validation rule "between" requires at least 2 parameters')
  })

  test('should be true when the search rule exists in field rules', () => {
    const fieldRules = formatRules({ name: 'required|min' }).name
    const rulesToFind = 'min'

    expect(hasRules(fieldRules, rulesToFind)).toBe(true)
  })

  test('should be false when the search rule doesn\'t exist in field rules', () => {
    const fieldRules = formatRules({ name: 'required|min' }).name
    const rulesToFind = 'max'

    expect(hasRules(fieldRules, rulesToFind)).toBe(false)
  })

  test('should be false when the search rule is an empty string', () => {
    const fieldRules = formatRules({ name: 'required|min' }).name
    const rulesToFind = ''

    expect(hasRules(fieldRules, rulesToFind)).toBe(false)
  })

  test('should be true when one of the search rules exists in field rules', () => {
    const fieldRules = formatRules({ name: 'min' }).name
    const rulesToFind = ['max', 'min']

    expect(hasRules(fieldRules, rulesToFind)).toBe(true)
  })

  test('should be false when none of the search rules exist in field rules', () => {
    const fieldRules = formatRules({ name: 'required|min' }).name
    const rulesToFind = ['boolean', 'max']

    expect(hasRules(fieldRules, rulesToFind)).toBe(false)
  })

  test('should be false when the search rule is an empty array', () => {
    const fieldRules = formatRules({ name: 'required|min' }).name
    const rulesToFind = []

    expect(hasRules(fieldRules, rulesToFind)).toBe(false)
  })

  test('should be false when field rules is an empty array', () => {
    const fieldRules = []
    const rulesToFind = 'min'

    expect(hasRules(fieldRules, rulesToFind)).toBe(false)
  })

  test('should be true when field rules have any of numeric rules', () => {
    const fieldRules = formatRules({ age: 'required|numeric' }).age

    expect(hasNumericRules(fieldRules)).toBe(true)
  })

  test('should be false when field rules don\'t have any of numeric rules', () => {
    const fieldRules = formatRules({ age: 'required' }).age

    expect(hasNumericRules(fieldRules)).toBe(false)
  })

  test('should return parsed single rule for single field', () => {
    const rules = { name: 'required' }
    const parsedRules = { name: [{ title: 'required', params: [] }] }

    expect(formatRules(rules)).toMatchObject(parsedRules)
  })

  test('should return parsed single rule with single param for single field', () => {
    const rules = { age: 'age:18' }
    const parsedRules = { age: [{ title: 'age', params: ['18'] }] }

    expect(formatRules(rules)).toMatchObject(parsedRules)
  })

  test('should return parsed single rule with multiple params for single field', () => {
    const rules = { password: 'between:5,10' }
    const parsedRules = { password: [{ title: 'between', params: ['5', '10'] }] }

    expect(formatRules(rules)).toMatchObject(parsedRules)
  })

  test('should return parsed multiple rules for single field', () => {
    const rules = { password: 'required|between:5,10' }
    const parsedRules = {
      password: [
        { title: 'required', params: [] },
        { title: 'between', params: ['5', '10'] }
      ]
    }

    expect(formatRules(rules)).toMatchObject(parsedRules)
  })

  test('should return parsed rules for multiple fields', () => {
    const rules = {
      age: 'age:18',
      password: 'required|between:5,10'
    }
    const parsedRules = {
      age: [{ title: 'age', params: ['18'] }],
      password: [
        { title: 'required', params: [] },
        { title: 'between', params: ['5', '10'] }
      ]
    }

    expect(formatRules(rules)).toMatchObject(parsedRules)
  })

  test('should be size of 1 when value is a string with 1 character', () => {
    expect(getSize('a', [])).toBe(1)
  })

  test('should be size of 5 when value is a string with 5 characters', () => {
    expect(getSize('aBcd3', [])).toBe(5)
  })

  test('should be size of 2 when value is a string with number 2 and numeric rules', () => {
    expect(getSize('2', [{ title: 'numeric', params: [] }])).toBe('2')
  })

  test('should be size of 1 when value is a string with number 1 and no numeric rules', () => {
    expect(getSize('2', [])).toBe(1)
  })

  test('should be size of 3 when value is a number with numeric rules', () => {
    expect(getSize(3, [{ title: 'numeric', params: [] }])).toBe(3)
  })

  test('should be size of 1 when value is a number with no numeric rules', () => {
    expect(getSize(3, [])).toBe(1)
  })

  test('should be size of 1 when value is an array with length of 1', () => {
    expect(getSize(['Jack'], [])).toBe(1)
  })

  test('should be size of 0 when value is an empty array', () => {
    expect(getSize([], [])).toBe(0)
  })
})
