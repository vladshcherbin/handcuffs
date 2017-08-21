import required from '../../src/rules/required'

describe('required rule', () => {
  test('should be true when value is a non-empty string', () => {
    expect(required('Jack')).toBe(true)
  })

  test('should be false when value is an empty string', () => {
    expect(required('')).toBe(false)
  })

  test('should be false when value has only white space', () => {
    expect(required(' ')).toBe(false)
  })

  test('should be true when value is a number', () => {
    expect(required(10)).toBe(true)
  })

  test('should be true when value is a boolean value "true"', () => {
    expect(required(true)).toBe(true)
  })

  test('should be true when value is a boolean value "false"', () => {
    expect(required(false)).toBe(true)
  })

  test('should be true when value is a non-empty array', () => {
    expect(required(['Jack'])).toBe(true)
  })

  test('should be false when value is an empty array', () => {
    expect(required([])).toBe(false)
  })

  test('should be true when value is an object', () => {
    expect(required({})).toBe(true)
  })

  test('should be false when value is null', () => {
    expect(required(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(required()).toBe(false)
  })
})
