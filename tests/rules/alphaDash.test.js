import alphaDash from '../../src/rules/alphaDash'

describe('alphaDash rule', () => {
  test('should be true when value is a non-empty string with a-z, A-Z, number, dash or underscore characters', () => {
    expect(alphaDash('Jack123_-0')).toBe(true)
  })

  test('should be false when value is an empty string', () => {
    expect(alphaDash('')).toBe(false)
  })

  test('should be false when value is a string with white space', () => {
    expect(alphaDash(' ')).toBe(false)
  })

  test('should be true when value is a string with a number', () => {
    expect(alphaDash('9')).toBe(true)
  })

  test('should be true when value is a string with a dash', () => {
    expect(alphaDash('-')).toBe(true)
  })

  test('should be true when value is a string with an underscore', () => {
    expect(alphaDash('_')).toBe(true)
  })

  test('should be true when value is a number', () => {
    expect(alphaDash(10)).toBe(true)
  })

  test('should be false when value is a boolean value', () => {
    expect(alphaDash(true)).toBe(false)
  })

  test('should be false when value is an array', () => {
    expect(alphaDash(['Jack'])).toBe(false)
  })

  test('should be false when value is an object', () => {
    expect(alphaDash({})).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(alphaDash(null)).toBe(false)
  })

  test('should be false when no value is provided', () => {
    expect(alphaDash()).toBe(false)
  })
})
