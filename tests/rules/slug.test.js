import slug from '../../src/rules/slug'

describe('slug rule', () => {
  test('should be true when value is a string with only lowercase alpha-numeric characters', () => {
    expect(slug('hey-ho-8')).toBe(true)
  })

  test('should be false when value is a string with uppercase alpha-numeric characters', () => {
    expect(slug('area-A')).toBe(false)
  })

  test('should be false when value is a string with not only alpha-numeric characters', () => {
    expect(slug('area_ 51')).toBe(false)
  })

  test('should be true when value is an empty string', () => {
    expect(slug('')).toBe(true)
  })

  test('should be false when value is a string with only whitespaces', () => {
    expect(slug(' ')).toBe(false)
  })

  test('should be false when value is a number', () => {
    expect(slug(10)).toBe(false)
  })

  test('should be false when value is a boolean value', () => {
    expect(slug(true)).toBe(false)
  })

  test('should be false when value is an array', () => {
    expect(slug(['Jack'])).toBe(false)
  })

  test('should be false when value is an object', () => {
    expect(slug({})).toBe(false)
  })

  test('should be false when value is undefined', () => {
    expect(slug(undefined)).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(slug(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(slug()).toBe(false)
  })
})
