import string from '../../src/rules/string'

describe('string rule', () => {
  test('should have "string" name', () => {
    expect(string().name).toBe('string')
  })

  test('should be valid when value is a string', () => {
    expect(string()('Jack')).toEqual({ valid: true })
  })

  test('should be invalid when value is a number', () => {
    expect(string()(10)).toEqual({ valid: false })
  })

  test('should be invalid when value is a boolean value', () => {
    expect(string()(true)).toEqual({ valid: false })
  })

  test('should be invalid when value is an array', () => {
    expect(string()(['Jack'])).toEqual({ valid: false })
  })

  test('should be invalid when value is an object', () => {
    expect(string()({})).toEqual({ valid: false })
  })

  test('should be invalid when value is undefined', () => {
    expect(string()(undefined)).toEqual({ valid: false })
  })

  test('should be invalid when value is null', () => {
    expect(string()(null)).toEqual({ valid: false })
  })

  test('should be invalid when no value is provided', () => {
    expect(string()()).toEqual({ valid: false })
  })
})
