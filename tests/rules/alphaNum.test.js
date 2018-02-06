import alphaNum from '../../src/rules/alphaNum'

describe('alphaNum rule', () => {
  test('should be true when value is a string with only alpha-numeric characters', () => {
    expect(alphaNum('area51')).toBe(true)
  })

  test('should be false when value is a string with non-alpha-numeric characters', () => {
    expect(alphaNum('jam.')).toBe(false)
  })

  test('should be true when value is an empty string', () => {
    expect(alphaNum('')).toBe(true)
  })

  test('should be false when value is a string with only white space', () => {
    expect(alphaNum(' ')).toBe(false)
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

  test('should be false when value is undefined', () => {
    expect(alphaNum(undefined)).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(alphaNum(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(alphaNum()).toBe(false)
  })
})
