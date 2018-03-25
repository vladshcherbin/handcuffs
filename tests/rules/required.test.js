import required from '../../src/rules/required'

describe('required rule', () => {
  test('should have "required" name', () => {
    expect(required().name).toBe('required')
  })

  test('should be valid when value is a non-empty string', () => {
    expect(required()('Jack')).toEqual({ valid: true })
  })

  test('should be invalid when value is an empty string', () => {
    expect(required()('')).toEqual({ valid: false })
  })

  test('should be invalid when value is a string with only whitespaces', () => {
    expect(required()(' ')).toEqual({ valid: false })
  })

  test('should be valid when value is a number', () => {
    expect(required()(10)).toEqual({ valid: true })
  })

  test('should be valid when value is a boolean value "true"', () => {
    expect(required()(true)).toEqual({ valid: true })
  })

  test('should be valid when value is a boolean value "false"', () => {
    expect(required()(false)).toEqual({ valid: true })
  })

  test('should be valid when value is a non-empty array', () => {
    expect(required()(['Jack'])).toEqual({ valid: true })
  })

  test('should be invalid when value is an empty array', () => {
    expect(required()([])).toEqual({ valid: false })
  })

  test('should be valid when value is an object', () => {
    expect(required()({})).toEqual({ valid: true })
  })

  test('should be invalid when value is undefined', () => {
    expect(required()(undefined)).toEqual({ valid: false })
  })

  test('should be invalid when value is null', () => {
    expect(required()(null)).toEqual({ valid: false })
  })

  test('should be invalid when no value is provided', () => {
    expect(required()()).toEqual({ valid: false })
  })
})
