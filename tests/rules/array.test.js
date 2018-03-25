import array from '../../src/rules/array'

describe('array rule', () => {
  test('should have "array" name', () => {
    expect(array().name).toBe('array')
  })

  test('should be valid when value is a non-empty array', () => {
    expect(array()(['Jack'])).toEqual({ valid: true })
  })

  test('should be valid when value is an empty array', () => {
    expect(array()([])).toEqual({ valid: true })
  })

  test('should be invalid when value is a string', () => {
    expect(array()('true')).toEqual({ valid: false })
  })

  test('should be invalid when value is a number', () => {
    expect(array()(10)).toEqual({ valid: false })
  })

  test('should be invalid when value is a boolean value', () => {
    expect(array()(true)).toEqual({ valid: false })
  })

  test('should be invalid when value is an object', () => {
    expect(array()({})).toEqual({ valid: false })
  })

  test('should be invalid when value is undefined', () => {
    expect(array()(undefined)).toEqual({ valid: false })
  })

  test('should be invalid when value is null', () => {
    expect(array()(null)).toEqual({ valid: false })
  })

  test('should be invalid when no value is provided', () => {
    expect(array()()).toEqual({ valid: false })
  })
})
