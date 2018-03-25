import alphaNumDash from '../../src/rules/alphaNumDash'

describe('alphaNumDash rule', () => {
  test('should have "alphaNumDash" name', () => {
    expect(alphaNumDash().name).toBe('alphaNumDash')
  })

  test('should be valid when value is a string with only alpha-numeric characters and dashes', () => {
    expect(alphaNumDash()('area51-_')).toEqual({ valid: true })
  })

  test('should be invalid when value is a string with non-alpha-numeric characters or dashes', () => {
    expect(alphaNumDash()('jam.')).toEqual({ valid: false })
  })

  test('should be valid when value is an empty string', () => {
    expect(alphaNumDash()('')).toEqual({ valid: true })
  })

  test('should be invalid when value is a string with only whitespaces', () => {
    expect(alphaNumDash()(' ')).toEqual({ valid: false })
  })

  test('should be valid when value is a number', () => {
    expect(alphaNumDash()(10)).toEqual({ valid: true })
  })

  test('should be invalid when value is a boolean value', () => {
    expect(alphaNumDash()(true)).toEqual({ valid: false })
  })

  test('should be invalid when value is an array', () => {
    expect(alphaNumDash()(['Jack'])).toEqual({ valid: false })
  })

  test('should be invalid when value is an object', () => {
    expect(alphaNumDash()({})).toEqual({ valid: false })
  })

  test('should be invalid when value is undefined', () => {
    expect(alphaNumDash()(undefined)).toEqual({ valid: false })
  })

  test('should be invalid when value is null', () => {
    expect(alphaNumDash()(null)).toEqual({ valid: false })
  })

  test('should be invalid when no value is provided', () => {
    expect(alphaNumDash()()).toEqual({ valid: false })
  })
})
