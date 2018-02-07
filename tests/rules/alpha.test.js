import alpha from '../../src/rules/alpha'

describe('alpha rule', () => {
  test('should be true when value is a string with only alphabetic characters', () => {
    expect(alpha('Jack')).toBe(true)
  })

  test('should be false when value is a string with non-alphabetic characters', () => {
    expect(alpha('area51')).toBe(false)
  })

  test('should be true when value is an empty string', () => {
    expect(alpha('')).toBe(true)
  })

  test('should be false when value is a string with only whitespaces', () => {
    expect(alpha(' ')).toBe(false)
  })

  test('should be false when value is a number', () => {
    expect(alpha(10)).toBe(false)
  })

  test('should be false when value is a boolean value', () => {
    expect(alpha(true)).toBe(false)
  })

  test('should be false when value is an array', () => {
    expect(alpha(['Jack'])).toBe(false)
  })

  test('should be false when value is an object', () => {
    expect(alpha({})).toBe(false)
  })

  test('should be false when value is undefined', () => {
    expect(alpha(undefined)).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(alpha(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(alpha()).toBe(false)
  })
})
