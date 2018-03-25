import slug from '../../src/rules/slug'

describe('slug rule', () => {
  test('should have "slug" name', () => {
    expect(slug().name).toBe('slug')
  })

  test('should be valid when value is a string with only lowercase alpha-numeric characters', () => {
    expect(slug()('hey-ho-8')).toEqual({ valid: true })
  })

  test('should be invalid when value is a string with uppercase alpha-numeric characters', () => {
    expect(slug()('area-A')).toEqual({ valid: false })
  })

  test('should be invalid when value is a string with not only alpha-numeric characters', () => {
    expect(slug()('area_ 51')).toEqual({ valid: false })
  })

  test('should be valid when value is an empty string', () => {
    expect(slug()('')).toEqual({ valid: true })
  })

  test('should be invalid when value is a string with only whitespaces', () => {
    expect(slug()(' ')).toEqual({ valid: false })
  })

  test('should be invalid when value is a number', () => {
    expect(slug()(10)).toEqual({ valid: false })
  })

  test('should be invalid when value is a boolean value', () => {
    expect(slug()(true)).toEqual({ valid: false })
  })

  test('should be invalid when value is an array', () => {
    expect(slug()(['Jack'])).toEqual({ valid: false })
  })

  test('should be invalid when value is an object', () => {
    expect(slug()({})).toEqual({ valid: false })
  })

  test('should be invalid when value is undefined', () => {
    expect(slug()(undefined)).toEqual({ valid: false })
  })

  test('should be invalid when value is null', () => {
    expect(slug()(null)).toEqual({ valid: false })
  })

  test('should be invalid when no value is provided', () => {
    expect(slug()()).toEqual({ valid: false })
  })
})
