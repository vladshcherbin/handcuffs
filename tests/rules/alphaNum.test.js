import alphaNum from '../../src/rules/alphaNum'

describe('alphaNum rule', () => {
  test('should be true when value is a non-empty string with a-z, A-Z or number characters', () => {
    expect(alphaNum('Jack123')).toBe(true)
  })

  test('should be false when value is an empty string', () => {
    expect(alphaNum('')).toBe(false)
  })

  test('should be false when value is a string with white space', () => {
    expect(alphaNum(' ')).toBe(false)
  })

  test('should be true when value is a string with a number', () => {
    expect(alphaNum('9')).toBe(true)
  })

  test('should be false when value is a string with a dash', () => {
    expect(alphaNum('-')).toBe(false)
  })

  test('should be false when value is a string with an underscore', () => {
    expect(alphaNum('_')).toBe(false)
  })

  test('should be true when value is a number', () => {
    expect(alphaNum(10)).toBe(true)
  })

  test('should be false when value is a boolean value', () => {
    expect(alphaNum(true)).toBe(false)
  })

  test('should be false when value is an array', () => {
    expect(alphaNum(['Jack'])).toBe(false)
  })

  test('should be false when value is an object', () => {
    expect(alphaNum({})).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(alphaNum(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(alphaNum()).toBe(false)
  })
})
