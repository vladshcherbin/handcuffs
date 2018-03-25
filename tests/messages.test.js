import { addMessage, formatErrorMessage } from '../src/messages'

describe('Messages', () => {
  test('should not throw when message for rule is defined', () => {
    expect(() => formatErrorMessage('required', {}, ['required'])).not.toThrow()
  })

  test('should throw when message for rule is not defined', () => {
    expect(() => formatErrorMessage('fake', {}, ['fake']))
      .toThrow('There is no defined error message for \'fake\' rule')
  })

  test('should not throw when all rules were passed', () => {
    expect(() => formatErrorMessage('required', {}, ['required'])).not.toThrow()
  })

  test('should throw when all rules were not passed', () => {
    expect(() => formatErrorMessage('required')).toThrow('All rules were not passed')
  })

  test('should return message', () => {
    expect(formatErrorMessage('required', {}, ['required'])).toEqual('This field is required')
  })

  test('should return message with params', () => {
    expect(formatErrorMessage('min', { min: 3 }, ['min'])).toEqual('This field must be at least 3 characters')
  })

  test('should return added message', () => {
    addMessage('fake', 'Fake message')

    expect(formatErrorMessage('fake', {}, [])).toEqual('Fake message')
  })

  describe('Rules', () => {
    test('should return \'accepted\' rule message', () => {
      expect(formatErrorMessage('accepted', {}, ['accepted'])).toEqual('This field must be accepted')
    })

    test('should return \'alpha\' rule message', () => {
      expect(formatErrorMessage('alpha', {}, ['alpha'])).toEqual('This field may only contain letters')
    })

    test('should return \'alphaNum\' rule message', () => {
      expect(formatErrorMessage('alphaNum', {}, ['alphaNum'])).toEqual('This field may only contain letters and numbers')
    })

    test('should return \'alphaNumDash\' rule message', () => {
      expect(formatErrorMessage('alphaNumDash', {}, ['alphaNumDash'])).toEqual('This field may only contain letters, numbers, dashes and underscores')
    })

    test('should return \'array\' rule message', () => {
      expect(formatErrorMessage('array', {}, ['array'])).toEqual('This field must be an array')
    })

    test('should return \'between\' rule message, array value', () => {
      expect(formatErrorMessage('between', { min: 2, max: 5 }, ['array', 'between'])).toEqual('This field must have between 2 and 5 items')
    })

    test('should return \'between\' rule message, numeric value', () => {
      expect(formatErrorMessage('between', { min: 2, max: 5 }, ['numeric', 'between'])).toEqual('This field must be between 2 and 5')
    })

    test('should return \'between\' rule message, string value', () => {
      expect(formatErrorMessage('between', { min: 2, max: 5 }, ['between'])).toEqual('This field must be between 2 and 5 characters')
    })

    test('should return \'boolean\' rule message', () => {
      expect(formatErrorMessage('boolean', {}, ['boolean'])).toEqual('This field must be true or false')
    })

    test('should return \'email\' rule message', () => {
      expect(formatErrorMessage('email', {}, ['email'])).toEqual('This field must be a valid email address')
    })

    test('should return \'max\' rule message, array value', () => {
      expect(formatErrorMessage('max', { max: 2 }, ['array', 'max'])).toEqual('This field may not have more than 2 items')
    })

    test('should return \'max\' rule message, numeric value', () => {
      expect(formatErrorMessage('max', { max: 2 }, ['numeric', 'max'])).toEqual('This field may not be greater than 2')
    })

    test('should return \'max\' rule message, string value', () => {
      expect(formatErrorMessage('max', { max: 2 }, ['max'])).toEqual('This field may not be greater than 2 characters')
    })

    test('should return \'min\' rule message, array value', () => {
      expect(formatErrorMessage('min', { min: 2 }, ['array', 'min'])).toEqual('This field must have at least 2 items')
    })

    test('should return \'min\' rule message, numeric value', () => {
      expect(formatErrorMessage('min', { min: 2 }, ['numeric', 'min'])).toEqual('This field must be at least 2')
    })

    test('should return \'min\' rule message, string value', () => {
      expect(formatErrorMessage('min', { min: 2 }, ['min'])).toEqual('This field must be at least 2 characters')
    })

    test('should return \'numeric\' rule message', () => {
      expect(formatErrorMessage('numeric', {}, ['numeric'])).toEqual('This field must be a number')
    })

    test('should return \'required\' rule message', () => {
      expect(formatErrorMessage('required', {}, ['required'])).toEqual('This field is required')
    })

    test('should return \'slug\' rule message', () => {
      expect(formatErrorMessage('slug', {}, ['slug'])).toEqual('This field may only contain lowercase letters, numbers and dashes')
    })

    test('should return \'string\' rule message', () => {
      expect(formatErrorMessage('string', {}, ['string'])).toEqual('This field must be a string')
    })
  })
})
