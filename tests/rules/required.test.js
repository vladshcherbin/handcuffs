import required from '../../src/rules/required'

describe('required', () => {
  test('should be true when value is non-empty string', () => {
    expect(required('Jack')).toBe(true)
  })

  test('should be true when value is number', () => {
    expect(required(10)).toBe(true)
  })

  test('should be false when value is an empty string', () => {
    expect(required('')).toBe(false)
  })

  test('should be false when value has only white space', () => {
    expect(required(' ')).toBe(false)
  })

  test('should be false when value is undefined', () => {
    expect(required(undefined)).toBe(false)
  })

  test('should be false when value is null', () => {
    expect(required(null)).toBe(false)
  })

  test('should be false when value is an empty array', () => {
    expect(required([])).toBe(false)
  })

  test('should be true when value is a non-empty array', () => {
    expect(required(['Jack'])).toBe(true)
  })

  test('should be true when value is a non-empty nested array', () => {
    expect(required([{ name: 'Jack' }])).toBe(true)
  })
})
