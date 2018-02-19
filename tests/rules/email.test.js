import email from '../../src/rules/email'

describe('email rule', () => {
  test('should be true when value is a valid email address', () => {
    expect(email('yep@gmail.com')).toBe(true)
    expect(email('hey.ho@gmail.com')).toBe(true)
    expect(email('hey@ho')).toBe(true)
  })

  test('should be false when value is a non-valid email address', () => {
    expect(email('hey')).toBe(false)
    expect(email('hey.')).toBe(false)
  })

  test('should be true when value is an empty string', () => {
    expect(email('')).toBe(true)
  })

  test('should be false when value is a string with only whitespaces', () => {
    expect(email(' ')).toBe(false)
  })

  test('should be false when value is a number', () => {
    expect(email(10)).toBe(false)
  })

  test('should be false when value is a boolean value', () => {
    expect(email(true)).toBe(false)
  })

  test('should be false when value is an array', () => {
    expect(email(['Jack'])).toBe(false)
  })

  test('should be false when value is an object', () => {
    expect(email({})).toBe(false)
  })

  test('should be false when value is undefined', () => {
    expect(email(undefined)).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(email(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(email()).toBe(false)
  })
})
