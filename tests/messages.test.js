import formatErrorMessage from '../src/messages'

describe('Validation messages', () => {
  test('should return predefined message', () => {
    expect(formatErrorMessage('required')).toBe('This field is required')
  })

  test('should return predefined message with params', () => {
    expect(formatErrorMessage('min', [3], [])).toBe('This field must be at least 3 characters')
  })

  test('should return predefined message with params, field value is supposed to be a number', () => {
    const fieldRules = [
      { title: 'numeric', params: [] },
      { title: 'min', params: [3] }
    ]
    expect(formatErrorMessage('min', [3], fieldRules)).toBe('This field must be at least 3')
  })

  test('should return predefined message with params, field value is supposed to be an array', () => {
    const fieldRules = [
      { title: 'array', params: [] },
      { title: 'min', params: [3] }
    ]
    expect(formatErrorMessage('min', [3], fieldRules)).toBe('This field must have at least 3 items')
  })

  test('should return predefined message with "min" rule and params', () => {
    expect(formatErrorMessage('min', [3], [])).toBe('This field must be at least 3 characters')
  })

  test('should return predefined message with "max" rule and params', () => {
    expect(formatErrorMessage('max', [3], [])).toBe('This field may not be greater than 3 characters')
  })

  test('should return predefined message with "between" rule and params', () => {
    expect(formatErrorMessage('between', [1, 3], [])).toBe('This field must be between 1 and 3 characters')
  })

  test('should return rule title when there is no predefined message', () => {
    expect(formatErrorMessage('fake-rule')).toBe('fake-rule')
  })
})
