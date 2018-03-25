import accepted from '../../src/rules/accepted'

describe('accepted rule', () => {
  test('should have "accepted" name', () => {
    expect(accepted().name).toBe('accepted')
  })

  test('should be valid when value is a string with value "yes"', () => {
    expect(accepted()('yes')).toEqual({ valid: true })
  })

  test('should be valid when value is a string with value "on"', () => {
    expect(accepted()('on')).toEqual({ valid: true })
  })

  test('should be invalid when value is a string with value other than "yes"', () => {
    expect(accepted()('Jack')).toEqual({ valid: false })
  })

  test('should be invalid when value is an empty string', () => {
    expect(accepted()('')).toEqual({ valid: false })
  })

  test('should be valid when value is a number with value "1"', () => {
    expect(accepted()(1)).toEqual({ valid: true })
  })

  test('should be invalid when value is a number with value other than "1"', () => {
    expect(accepted()(2)).toEqual({ valid: false })
  })

  test('should be valid when value is a boolean value "true"', () => {
    expect(accepted()(true)).toEqual({ valid: true })
  })

  test('should be invalid when value is a boolean value "false"', () => {
    expect(accepted()(false)).toEqual({ valid: false })
  })

  test('should be invalid when value is an array', () => {
    expect(accepted()(['Jack'])).toEqual({ valid: false })
  })

  test('should be invalid when value is an object', () => {
    expect(accepted()({})).toEqual({ valid: false })
  })

  test('should be invalid when value is undefined', () => {
    expect(accepted()(undefined)).toEqual({ valid: false })
  })

  test('should be invalid when value is null', () => {
    expect(accepted()(null)).toEqual({ valid: false })
  })

  test('should be invalid when no value is provided', () => {
    expect(accepted()()).toEqual({ valid: false })
  })
})
