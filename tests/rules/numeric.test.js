import numeric from '../../src/rules/numeric'

describe('numeric rule', () => {
  test('should be true when value is a positive number', () => {
    expect(numeric(10)).toBe(true)
  })

  test('should be true when value is a negative number', () => {
    expect(numeric(-10)).toBe(true)
  })

  test('should be true when value is a number with value "0"', () => {
    expect(numeric(0)).toBe(true)
  })

  test('should be true when value is a decimal number', () => {
    expect(numeric(-1.1)).toBe(true)
  })

  test('should be true when value is a hexadecimal number', () => {
    expect(numeric(0xff)).toBe(true)
  })

  test('should be true when value is a number with exponent notation', () => {
    expect(numeric(-5e3)).toBe(true)
  })

  test('should be true when value is a string with a positive number', () => {
    expect(numeric('9')).toBe(true)
  })

  test('should be true when value is a string with a negative number', () => {
    expect(numeric('-9')).toBe(true)
  })

  test('should be true when value is a string with value "0"', () => {
    expect(numeric('0')).toBe(true)
  })

  test('should be true when value is a string with a decimal number', () => {
    expect(numeric('-1.1')).toBe(true)
  })

  test('should be true when value is a string with a hexadecimal number', () => {
    expect(numeric('0xff')).toBe(true)
  })

  test('should be true when value is a string with exponent notation', () => {
    expect(numeric('-5e3')).toBe(true)
  })

  test('should be false when value is a string with a number and another characters', () => {
    expect(numeric('9abc')).toBe(false)
  })

  test('should be false when value is an empty string', () => {
    expect(numeric('')).toBe(false)
  })

  test('should be true when value is a numeric string with whitespaces', () => {
    expect(numeric('  3 ')).toBe(true)
  })

  test('should be false when value is a string with only whitespaces', () => {
    expect(numeric(' ')).toBe(false)
  })

  test('should be false when value is a boolean value', () => {
    expect(numeric(true)).toBe(false)
  })

  test('should be false when value is an array', () => {
    expect(numeric([])).toBe(false)
  })

  test('should be false when value is an object', () => {
    expect(numeric({})).toBe(false)
  })

  test('should be false when value is undefined', () => {
    expect(numeric(undefined)).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(numeric(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(numeric()).toBe(false)
  })
})
