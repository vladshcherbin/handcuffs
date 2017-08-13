import array from '../../src/rules/array'

describe('array', () => {
  test('should be true when value is empty array', () => {
    expect(array([])).toBe(true)
  })

  test('should be true when value is non-empty array', () => {
    expect(array(['Jack'])).toBe(true)
  })

  test('should be false when value is object', () => {
    expect(array({})).toBe(false)
  })

  test('should be false when value is string', () => {
    expect(array('true')).toBe(false)
  })

  test('should be false when value is number', () => {
    expect(array(1)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(array()).toBe(false)
  })
})
