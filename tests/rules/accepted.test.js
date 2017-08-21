import accepted from '../../src/rules/accepted'

describe('accepted rule', () => {
  test('should be true when value is a string with value "yes"', () => {
    expect(accepted('yes')).toBe(true)
  })

  test('should be true when value is a string with value "on"', () => {
    expect(accepted('on')).toBe(true)
  })

  test('should be false when value is a string with value other than "yes"', () => {
    expect(accepted('Jack')).toBe(false)
  })

  test('should be false when value is an empty string', () => {
    expect(accepted('')).toBe(false)
  })

  test('should be true when value is a number with value "1"', () => {
    expect(accepted(1)).toBe(true)
  })

  test('should be false when value is a number with value other than "1"', () => {
    expect(accepted(2)).toBe(false)
  })

  test('should be true when value is a boolean value "true"', () => {
    expect(accepted(true)).toBe(true)
  })

  test('should be false when value is a boolean value "false"', () => {
    expect(accepted(false)).toBe(false)
  })

  test('should be false when value is an array', () => {
    expect(accepted([])).toBe(false)
  })

  test('should be false when value is an object', () => {
    expect(accepted({})).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(accepted(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(accepted()).toBe(false)
  })
})
