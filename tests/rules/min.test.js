import min from '../../src/rules/min'

describe('min rule', () => {
  test('should have "min" name', () => {
    expect(min(1).name).toBe('min')
  })

  test('should throw when rule params not provided', () => {
    expect(() => { min()('abc') }).toThrow()
  })

  test('should be valid when value is a string equal to defined length', () => {
    expect(min(3)('abc', [])).toEqual({ valid: true, params: { min: 3 } })
  })

  test('should be valid when value is a string longer than defined length', () => {
    expect(min(3)('abcd', [])).toEqual({ valid: true, params: { min: 3 } })
  })

  test('should be invalid when value is a string shorter than defined length', () => {
    expect(min(3)('a', [])).toEqual({ valid: false, params: { min: 3 } })
  })

  test('should be invalid when value is a string with whitespaces, shorter than defined length', () => {
    expect(min(3)('a  ', [])).toEqual({ valid: false, params: { min: 3 } })
  })

  test('should be valid when value is a numeric string, numeric rules, equal to defined size', () => {
    expect(min(3)('3', ['numeric'])).toEqual({ valid: true, params: { min: 3 } })
  })

  test('should be valid when value is a numeric string, numeric rules, more than defined size', () => {
    expect(min(3)('4', ['numeric'])).toEqual({ valid: true, params: { min: 3 } })
  })

  test('should be invalid when value is a numeric string, numeric rules, less than defined size', () => {
    expect(min(3)('2', ['numeric'])).toEqual({ valid: false, params: { min: 3 } })
  })

  test('should be valid when value is an array equal to defined size', () => {
    expect(min(3)([1, 2, 3], [])).toEqual({ valid: true, params: { min: 3 } })
  })

  test('should be valid when value is an array bigger than defined size', () => {
    expect(min(3)([1, 2, 3, 4], [])).toEqual({ valid: true, params: { min: 3 } })
  })

  test('should be invalid when value is an array smaller than defined size', () => {
    expect(min(3)([1, 2], [])).toEqual({ valid: false, params: { min: 3 } })
  })
})
