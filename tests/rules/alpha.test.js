import alpha from '../../src/rules/alpha'

describe('alpha rule', () => {
  test('should be true when value is a non-empty string with a-z, A-Z characters', () => {
    expect(alpha('Jack')).toBe(true)
  })

  test('should be false when value is an empty string', () => {
    expect(alpha('')).toBe(false)
  })

  test('should be false when value is a string with white space', () => {
    expect(alpha(' ')).toBe(false)
  })

  test('should be false when value is a string with a number', () => {
    expect(alpha('9')).toBe(false)
  })

  test('should be false when value is a string with a dash', () => {
    expect(alpha('-')).toBe(false)
  })

  test('should be false when value is a string with an underscore', () => {
    expect(alpha('_')).toBe(false)
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

  test('should be false when value is null', () => {
    expect(alpha(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(alpha()).toBe(false)
  })
})
