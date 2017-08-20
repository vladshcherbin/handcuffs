import formatErrorMessage from '../src/messages'

describe('Validation messages', () => {
  test('should return predefined message', () => {
    expect(formatErrorMessage('required')).toBe('This field is required')
  })

  test('should return rule title when there is no predefined message', () => {
    expect(formatErrorMessage('fake-rule')).toBe('fake-rule')
  })
})
