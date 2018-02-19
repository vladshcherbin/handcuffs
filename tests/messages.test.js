import { parseRules } from '../src/rules'
import { addMessage, formatErrorMessage } from '../src/messages'

describe('Messages', () => {
  test('should not throw when message for rule is defined', () => {
    const rules = parseRules('required')

    expect(() => formatErrorMessage(rules[0], rules)).not.toThrow()
  })

  test('should throw when message for rule is not defined', () => {
    const rules = parseRules('fake')

    expect(() => formatErrorMessage(rules[0], rules))
      .toThrow('There is no defined error message for \'fake\' rule')
  })

  test('should not throw when all rules were passed', () => {
    const rules = parseRules('required')

    expect(() => formatErrorMessage(rules[0], rules)).not.toThrow()
  })

  test('should throw when all rules were not passed', () => {
    const rules = parseRules('required')

    expect(() => formatErrorMessage(rules[0])).toThrow('All rules were not passed')
  })

  test('should return message', () => {
    const rules = parseRules('required')

    expect(formatErrorMessage(rules[0], rules)).toEqual('This field is required')
  })

  test('should return message with params', () => {
    const rules = parseRules('min:3')

    expect(formatErrorMessage(rules[0], rules)).toEqual('This field must be at least 3 characters')
  })

  test('should return added message', () => {
    addMessage('fake', 'Fake message')

    expect(formatErrorMessage({ title: 'fake', params: [] }, [])).toEqual('Fake message')
  })

  describe('Rules', () => {
    test('should return \'accepted\' rule message', () => {
      const rules = parseRules('accepted')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field must be accepted')
    })

    test('should return \'alpha\' rule message', () => {
      const rules = parseRules('alpha')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field may only contain letters')
    })

    test('should return \'alphaNum\' rule message', () => {
      const rules = parseRules('alphaNum')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field may only contain letters and numbers')
    })

    test('should return \'alphaNumDash\' rule message', () => {
      const rules = parseRules('alphaNumDash')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field may only contain letters, numbers, dashes and underscores')
    })

    test('should return \'array\' rule message', () => {
      const rules = parseRules('array')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field must be an array')
    })

    test('should return \'between\' rule message, array value', () => {
      const rules = parseRules('array|between:2,5')

      expect(formatErrorMessage(rules[1], rules)).toEqual('This field must have between 2 and 5 items')
    })

    test('should return \'between\' rule message, numeric value', () => {
      const rules = parseRules('numeric|between:2,5')

      expect(formatErrorMessage(rules[1], rules)).toEqual('This field must be between 2 and 5')
    })

    test('should return \'between\' rule message, string value', () => {
      const rules = parseRules('between:2,5')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field must be between 2 and 5 characters')
    })

    test('should return \'boolean\' rule message', () => {
      const rules = parseRules('boolean')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field must be true or false')
    })

    test('should return \'max\' rule message, array value', () => {
      const rules = parseRules('array|max:2')

      expect(formatErrorMessage(rules[1], rules)).toEqual('This field may not have more than 2 items')
    })

    test('should return \'max\' rule message, numeric value', () => {
      const rules = parseRules('numeric|max:2')

      expect(formatErrorMessage(rules[1], rules)).toEqual('This field may not be greater than 2')
    })

    test('should return \'max\' rule message, string value', () => {
      const rules = parseRules('max:2')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field may not be greater than 2 characters')
    })

    test('should return \'min\' rule message, array value', () => {
      const rules = parseRules('array|min:2')

      expect(formatErrorMessage(rules[1], rules)).toEqual('This field must have at least 2 items')
    })

    test('should return \'min\' rule message, numeric value', () => {
      const rules = parseRules('numeric|min:2')

      expect(formatErrorMessage(rules[1], rules)).toEqual('This field must be at least 2')
    })

    test('should return \'min\' rule message, string value', () => {
      const rules = parseRules('min:2')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field must be at least 2 characters')
    })

    test('should return \'numeric\' rule message', () => {
      const rules = parseRules('numeric')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field must be a number')
    })

    test('should return \'required\' rule message', () => {
      const rules = parseRules('required')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field is required')
    })

    test('should return \'slug\' rule message', () => {
      const rules = parseRules('slug')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field may only contain lowercase letters, numbers and dashes')
    })

    test('should return \'string\' rule message', () => {
      const rules = parseRules('string')

      expect(formatErrorMessage(rules[0], rules)).toEqual('This field must be a string')
    })
  })
})
