import array from '../../src/rules/array'

describe('array rule', () => {
  test('should be true when value is a non-empty array', () => {
    expect(array(['Jack'])).toBe(true)
  })

  test('should be true when value is an empty array', () => {
    expect(array([])).toBe(true)
  })

  test('should be false when value is a string', () => {
    expect(array('true')).toBe(false)
  })

  test('should be false when value is a number', () => {
    expect(array(10)).toBe(false)
  })

  test('should be false when value is a boolean value', () => {
    expect(array(true)).toBe(false)
  })

  test('should be false when value is an object', () => {
    expect(array({})).toBe(false)
  })

  test('should be false when value is undefined', () => {
    expect(array(undefined)).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(array(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(array()).toBe(false)
  })
})
