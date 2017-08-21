import boolean from '../../src/rules/boolean'

describe('boolean rule', () => {
  test('should be true when value is a boolean value "true"', () => {
    expect(boolean(true)).toBe(true)
  })

  test('should be true when value is a boolean value "false"', () => {
    expect(boolean(false)).toBe(true)
  })

  test('should be false when value is a string', () => {
    expect(boolean('true')).toBe(false)
  })

  test('should be false when value is a number', () => {
    expect(boolean(1)).toBe(false)
  })

  test('should be false when value is an array', () => {
    expect(boolean([])).toBe(false)
  })

  test('should be false when value is an object', () => {
    expect(boolean({})).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(boolean(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(boolean()).toBe(false)
  })
})
