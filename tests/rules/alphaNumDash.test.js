import alphaNumDash from '../../src/rules/alphaNumDash'

describe('alphaNumDash rule', () => {
  test('should be true when value is a string with only alpha-numeric characters and dashes', () => {
    expect(alphaNumDash('area51-_')).toBe(true)
  })

  test('should be false when value is a string with non-alpha-numeric characters or dashes', () => {
    expect(alphaNumDash('jam.')).toBe(false)
  })

  test('should be true when value is an empty string', () => {
    expect(alphaNumDash('')).toBe(true)
  })

  test('should be false when value is a string with only whitespaces', () => {
    expect(alphaNumDash(' ')).toBe(false)
  })

  test('should be true when value is a number', () => {
    expect(alphaNumDash(10)).toBe(true)
  })

  test('should be false when value is a boolean value', () => {
    expect(alphaNumDash(true)).toBe(false)
  })

  test('should be false when value is an array', () => {
    expect(alphaNumDash(['Jack'])).toBe(false)
  })

  test('should be false when value is an object', () => {
    expect(alphaNumDash({})).toBe(false)
  })

  test('should be false when value is undefined', () => {
    expect(alphaNumDash(undefined)).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(alphaNumDash(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(alphaNumDash()).toBe(false)
  })
})
