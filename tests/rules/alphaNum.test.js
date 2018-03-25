import alphaNum from '../../src/rules/alphaNum'

describe('alphaNum rule', () => {
  test('should have "alphaNum" name', () => {
    expect(alphaNum().name).toBe('alphaNum')
  })

  test('should be valid when value is a string with only alpha-numeric characters', () => {
    expect(alphaNum()('area51')).toEqual({ valid: true })
  })

  test('should be invalid when value is a string with non-alpha-numeric characters', () => {
    expect(alphaNum()('jam.')).toEqual({ valid: false })
  })

  test('should be valid when value is an empty string', () => {
    expect(alphaNum()('')).toEqual({ valid: true })
  })

  test('should be invalid when value is a string with only whitespaces', () => {
    expect(alphaNum()(' ')).toEqual({ valid: false })
  })

  test('should be valid when value is a number', () => {
    expect(alphaNum()(10)).toEqual({ valid: true })
  })

  test('should be invalid when value is a boolean value', () => {
    expect(alphaNum()(true)).toEqual({ valid: false })
  })

  test('should be invalid when value is an array', () => {
    expect(alphaNum()(['Jack'])).toEqual({ valid: false })
  })

  test('should be invalid when value is an object', () => {
    expect(alphaNum()({})).toEqual({ valid: false })
  })

  test('should be invalid when value is undefined', () => {
    expect(alphaNum()(undefined)).toEqual({ valid: false })
  })

  test('should be invalid when value is null', () => {
    expect(alphaNum()(null)).toEqual({ valid: false })
  })

  test('should be invalid when no value is provided', () => {
    expect(alphaNum()()).toEqual({ valid: false })
  })
})
