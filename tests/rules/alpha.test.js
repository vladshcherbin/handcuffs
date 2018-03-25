import alpha from '../../src/rules/alpha'

describe('alpha rule', () => {
  test('should have "alpha" name', () => {
    expect(alpha().name).toBe('alpha')
  })

  test('should be valid when value is a string with only alphabetic characters', () => {
    expect(alpha()('Jack')).toEqual({ valid: true })
  })

  test('should be invalid when value is a string with non-alphabetic characters', () => {
    expect(alpha()('area51')).toEqual({ valid: false })
  })

  test('should be valid when value is an empty string', () => {
    expect(alpha()('')).toEqual({ valid: true })
  })

  test('should be invalid when value is a string with only whitespaces', () => {
    expect(alpha()(' ')).toEqual({ valid: false })
  })

  test('should be invalid when value is a number', () => {
    expect(alpha()(10)).toEqual({ valid: false })
  })

  test('should be invalid when value is a boolean value', () => {
    expect(alpha()(true)).toEqual({ valid: false })
  })

  test('should be invalid when value is an array', () => {
    expect(alpha()(['Jack'])).toEqual({ valid: false })
  })

  test('should be invalid when value is an object', () => {
    expect(alpha()({})).toEqual({ valid: false })
  })

  test('should be invalid when value is undefined', () => {
    expect(alpha()(undefined)).toEqual({ valid: false })
  })

  test('should be invalid when value is null', () => {
    expect(alpha()(null)).toEqual({ valid: false })
  })

  test('should be invalid when no value is provided', () => {
    expect(alpha()()).toEqual({ valid: false })
  })
})
