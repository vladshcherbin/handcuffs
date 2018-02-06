import string from '../../src/rules/string'

describe('string rule', () => {
  test('should be true when value is a string', () => {
    expect(string('Jack')).toBe(true)
  })

  test('should be false when value is a number', () => {
    expect(string(10)).toBe(false)
  })

  test('should be false when value is a boolean value', () => {
    expect(string(true)).toBe(false)
  })

  test('should be false when value is an array', () => {
    expect(string(['Jack'])).toBe(false)
  })

  test('should be false when value is an object', () => {
    expect(string({})).toBe(false)
  })

  test('should be false when value is undefined', () => {
    expect(string(undefined)).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(string(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(string()).toBe(false)
  })
})
