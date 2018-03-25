import boolean from '../../src/rules/boolean'

describe('boolean rule', () => {
  test('should have "boolean" name', () => {
    expect(boolean().name).toBe('boolean')
  })

  test('should be valid when value is a boolean value "true"', () => {
    expect(boolean()(true)).toEqual({ valid: true })
  })

  test('should be valid when value is a boolean value "false"', () => {
    expect(boolean()(false)).toEqual({ valid: true })
  })

  test('should be invalid when value is a string', () => {
    expect(boolean()('true')).toEqual({ valid: false })
  })

  test('should be invalid when value is a number', () => {
    expect(boolean()(1)).toEqual({ valid: false })
  })

  test('should be invalid when value is an array', () => {
    expect(boolean()([])).toEqual({ valid: false })
  })

  test('should be invalid when value is an object', () => {
    expect(boolean()({})).toEqual({ valid: false })
  })

  test('should be invalid when value is undefined', () => {
    expect(boolean()(undefined)).toEqual({ valid: false })
  })

  test('should be invalid when value is null', () => {
    expect(boolean()(null)).toEqual({ valid: false })
  })

  test('should be invalid when no value is provided', () => {
    expect(boolean()()).toEqual({ valid: false })
  })
})
