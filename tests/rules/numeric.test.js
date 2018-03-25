import numeric from '../../src/rules/numeric'

describe('numeric rule', () => {
  test('should have "numeric" name', () => {
    expect(numeric().name).toBe('numeric')
  })

  test('should be valid when value is a positive number', () => {
    expect(numeric()(10)).toEqual({ valid: true })
  })

  test('should be valid when value is a negative number', () => {
    expect(numeric()(-10)).toEqual({ valid: true })
  })

  test('should be valid when value is a number with value "0"', () => {
    expect(numeric()(0)).toEqual({ valid: true })
  })

  test('should be valid when value is a decimal number', () => {
    expect(numeric()(-1.1)).toEqual({ valid: true })
  })

  test('should be valid when value is a hexadecimal number', () => {
    expect(numeric()(0xff)).toEqual({ valid: true })
  })

  test('should be valid when value is a number with exponent notation', () => {
    expect(numeric()(-5e3)).toEqual({ valid: true })
  })

  test('should be valid when value is a string with a positive number', () => {
    expect(numeric()('9')).toEqual({ valid: true })
  })

  test('should be valid when value is a string with a negative number', () => {
    expect(numeric()('-9')).toEqual({ valid: true })
  })

  test('should be valid when value is a string with value "0"', () => {
    expect(numeric()('0')).toEqual({ valid: true })
  })

  test('should be valid when value is a string with a decimal number', () => {
    expect(numeric()('-1.1')).toEqual({ valid: true })
  })

  test('should be valid when value is a string with a hexadecimal number', () => {
    expect(numeric()('0xff')).toEqual({ valid: true })
  })

  test('should be valid when value is a string with exponent notation', () => {
    expect(numeric()('-5e3')).toEqual({ valid: true })
  })

  test('should be invalid when value is a string with a number and another characters', () => {
    expect(numeric()('9abc')).toEqual({ valid: false })
  })

  test('should be invalid when value is an empty string', () => {
    expect(numeric()('')).toEqual({ valid: false })
  })

  test('should be valid when value is a numeric string with whitespaces', () => {
    expect(numeric()('  3 ')).toEqual({ valid: true })
  })

  test('should be invalid when value is a string with only whitespaces', () => {
    expect(numeric()(' ')).toEqual({ valid: false })
  })

  test('should be invalid when value is a boolean value', () => {
    expect(numeric()(true)).toEqual({ valid: false })
  })

  test('should be invalid when value is an array', () => {
    expect(numeric()([])).toEqual({ valid: false })
  })

  test('should be invalid when value is an object', () => {
    expect(numeric()({})).toEqual({ valid: false })
  })

  test('should be invalid when value is undefined', () => {
    expect(numeric()(undefined)).toEqual({ valid: false })
  })

  test('should be invalid when value is null', () => {
    expect(numeric()(null)).toEqual({ valid: false })
  })

  test('should be invalid when no value is provided', () => {
    expect(numeric()()).toEqual({ valid: false })
  })
})
