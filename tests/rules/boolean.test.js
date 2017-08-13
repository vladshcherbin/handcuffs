import boolean from '../../src/rules/boolean'

describe('boolean', () => {
  test('should be true when value is boolean true', () => {
    expect(boolean(true)).toBe(true)
  })

  test('should be true when value is boolean false', () => {
    expect(boolean(false)).toBe(true)
  })

  test('should be false when value is string', () => {
    expect(boolean('true')).toBe(false)
  })

  test('should be false when value is number', () => {
    expect(boolean(1)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(boolean()).toBe(false)
  })
})
