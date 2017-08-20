import { addRule, formatRules, getRule } from '../src/rules'

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
