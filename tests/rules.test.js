import {
  addRule,
  formatRules,
  getRule,
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

  test('should return true when the search rule exists in field rules', () => {
    const fieldRules = formatRules({ name: 'required|min' }).name
    const rulesToFind = 'min'

    expect(hasRules(fieldRules, rulesToFind)).toBe(true)
  })

  test('should return false when the search rule doesn\'t exist in field rules', () => {
    const fieldRules = formatRules({ name: 'required|min' }).name
    const rulesToFind = 'max'

    expect(hasRules(fieldRules, rulesToFind)).toBe(false)
  })

  test('should return false when the search rule is an empty string', () => {
    const fieldRules = formatRules({ name: 'required|min' }).name
    const rulesToFind = ''

    expect(hasRules(fieldRules, rulesToFind)).toBe(false)
  })

  test('should return true when one of the search rules exists in field rules', () => {
    const fieldRules = formatRules({ name: 'min' }).name
    const rulesToFind = ['max', 'min']

    expect(hasRules(fieldRules, rulesToFind)).toBe(true)
  })

  test('should return false when none of the search rules exist in field rules', () => {
    const fieldRules = formatRules({ name: 'required|min' }).name
    const rulesToFind = ['boolean', 'max']

    expect(hasRules(fieldRules, rulesToFind)).toBe(false)
  })

  test('should return false when the search rule is an empty array', () => {
    const fieldRules = formatRules({ name: 'required|min' }).name
    const rulesToFind = []

    expect(hasRules(fieldRules, rulesToFind)).toBe(false)
  })

  test('should return false when field rules is an empty array', () => {
    const fieldRules = []
    const rulesToFind = 'min'

    expect(hasRules(fieldRules, rulesToFind)).toBe(false)
  })

  test('should return true when field rules have any of numeric rules', () => {
    const fieldRules = formatRules({ age: 'required|numeric' }).age

    expect(hasNumericRules(fieldRules)).toBe(true)
  })

  test('should return false when field rules don\'t have any of numeric rules', () => {
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
})
