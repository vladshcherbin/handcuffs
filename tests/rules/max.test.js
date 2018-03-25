import max from '../../src/rules/max'

describe('max rule', () => {
  test('should have "max" name', () => {
    expect(max(1).name).toBe('max')
  })

  test('should throw when rule params not provided', () => {
    expect(() => { max()('abc') }).toThrow()
  })

  test('should be valid when value is a string equal to defined length', () => {
    expect(max(3)('abc', [])).toEqual({ valid: true, params: { max: 3 } })
  })

  test('should be valid when value is a string shorter than defined length', () => {
    expect(max(3)('ad', [])).toEqual({ valid: true, params: { max: 3 } })
  })

  test('should be invalid when value is a string longer than defined length', () => {
    expect(max(3)('abcd', [])).toEqual({ valid: false, params: { max: 3 } })
  })

  test('should be valid when value is a string with whitespaces, shorter than defined length', () => {
    expect(max(3)('a  ', [])).toEqual({ valid: true, params: { max: 3 } })
  })

  test('should be valid when value is a numeric string, numeric rules, equal to defined size', () => {
    expect(max(3)('3', ['numeric'])).toEqual({ valid: true, params: { max: 3 } })
  })

  test('should be valid when value is a numeric string, numeric rules, less than defined size', () => {
    expect(max(3)('2', ['numeric'])).toEqual({ valid: true, params: { max: 3 } })
  })

  test('should be invalid when value is a numeric string, numeric rules, more than defined size', () => {
    expect(max(3)('4', ['numeric'])).toEqual({ valid: false, params: { max: 3 } })
  })

  test('should be valid when value is an array equal to defined size', () => {
    expect(max(3)([1, 2, 3], [])).toEqual({ valid: true, params: { max: 3 } })
  })

  test('should be valid when value is an array smaller than defined size', () => {
    expect(max(3)([1, 2], [])).toEqual({ valid: true, params: { max: 3 } })
  })

  test('should be invalid when value is an array bigger than defined size', () => {
    expect(max(3)([1, 2, 3, 4], [])).toEqual({ valid: false, params: { max: 3 } })
  })
})
