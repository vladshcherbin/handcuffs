import between from '../../src/rules/between'

describe('between rule', () => {
  test('should have "between" name', () => {
    expect(between(1, 2).name).toBe('between')
  })

  test('should throw when rule params not provided', () => {
    expect(() => { between()('abc') }).toThrow()
  })

  test('should throw when less than needed rule params provided', () => {
    expect(() => { between(1)('abc') }).toThrow()
  })

  test('should be valid when value is a string with shortest defined length', () => {
    expect(between(3, 7)('abc', [])).toEqual({ valid: true, params: { min: 3, max: 7 } })
  })

  test('should be valid when value is a string between shortest and longest defined length', () => {
    expect(between(3, 7)('abcde', [])).toEqual({ valid: true, params: { min: 3, max: 7 } })
  })

  test('should be valid when value is a string with longest defined length', () => {
    expect(between(3, 7)('adcdefg', [])).toEqual({ valid: true, params: { min: 3, max: 7 } })
  })

  test('should be invalid when value is a string shorter than defined length', () => {
    expect(between(3, 7)('ab', [])).toEqual({ valid: false, params: { min: 3, max: 7 } })
  })

  test('should be invalid when value is a string longer than defined length', () => {
    expect(between(3, 7)('abcdefge', [])).toEqual({ valid: false, params: { min: 3, max: 7 } })
  })

  test('should be valid when value is a string with whitespaces and shortest defined length', () => {
    expect(between(3, 7)(' abc  ', [])).toEqual({ valid: true, params: { min: 3, max: 7 } })
  })

  test('should be valid when value is a string with whitespaces, between shortest and longest defined length', () => {
    expect(between(3, 7)(' abcde  ', [])).toEqual({ valid: true, params: { min: 3, max: 7 } })
  })

  test('should be valid when value is a string with whitespaces and longest defined length', () => {
    expect(between(3, 7)(' abcdefg  ', [])).toEqual({ valid: true, params: { min: 3, max: 7 } })
  })

  test('should be valid when value is a numeric string, numeric rules, equal to smallest defined size', () => {
    expect(between(3, 7)('3', ['numeric'])).toEqual({ valid: true, params: { min: 3, max: 7 } })
  })

  test('should be valid when value is a numeric string, numeric rules, between smallest and biggest defined sizes', () => {
    expect(between(3, 7)('5', ['numeric'])).toEqual({ valid: true, params: { min: 3, max: 7 } })
  })

  test('should be valid when value is a numeric string, numeric rules, equal to biggest defined size', () => {
    expect(between(3, 7)('7', ['numeric'])).toEqual({ valid: true, params: { min: 3, max: 7 } })
  })

  test('should be invalid when value is a numeric string, numeric rules, smaller than smallest defined size', () => {
    expect(between(3, 7)('2', ['numeric'])).toEqual({ valid: false, params: { min: 3, max: 7 } })
  })

  test('should be invalid when value is a numeric string, numeric rules, bigger than biggest defined size', () => {
    expect(between(3, 7)('8', ['numeric'])).toEqual({ valid: false, params: { min: 3, max: 7 } })
  })

  test('should be valid when value is an array equal to smallest defined size', () => {
    expect(between(3, 7)([1, 2, 3], [])).toEqual({ valid: true, params: { min: 3, max: 7 } })
  })

  test('should be valid when value is an array between smallest and biggest defined sizes', () => {
    expect(between(3, 7)([1, 2, 3, 4, 5], [])).toEqual({ valid: true, params: { min: 3, max: 7 } })
  })

  test('should be valid when value is an array equal to biggest defined size', () => {
    expect(between(3, 7)([1, 2, 3, 4, 5, 6, 7], [])).toEqual({ valid: true, params: { min: 3, max: 7 } })
  })

  test('should be invalid when value is an array smaller than smallest defined size', () => {
    expect(between(3, 7)([1, 2], [])).toEqual({ valid: false, params: { min: 3, max: 7 } })
  })

  test('should be invalid when value is an array bigger than biggest defined size', () => {
    expect(between(3, 7)([1, 2, 3, 4, 5, 6, 7, 8], [])).toEqual({ valid: false, params: { min: 3, max: 7 } })
  })
})
