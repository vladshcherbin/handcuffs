import between from '../../src/rules/between'

describe('between rule', () => {
  test('should throw when rule params not provided', () => {
    expect(() => { between('abc') }).toThrow()
  })

  test('should throw when less than needed rule params provided', () => {
    expect(() => { between('abc', [1]) }).toThrow()
  })

  test('should be true when value is a string with shortest defined length', () => {
    expect(between('abc', [3, 7], [])).toBe(true)
  })

  test('should be true when value is a string between shortest and longest defined length', () => {
    expect(between('abcde', [3, 7], [])).toBe(true)
  })

  test('should be true when value is a string with longest defined length', () => {
    expect(between('adcdefg', [3, 7], [])).toBe(true)
  })

  test('should be false when value is a string shorter than defined length', () => {
    expect(between('ab', [3, 7], [])).toBe(false)
  })

  test('should be false when value is a string longer than defined length', () => {
    expect(between('abcdefge', [3, 7], [])).toBe(false)
  })

  test('should be true when value is a string with whitespaces and shortest defined length', () => {
    expect(between(' abc  ', [3, 7], [])).toBe(true)
  })

  test('should be true when value is a string with whitespaces, between shortest and longest defined length', () => {
    expect(between(' abcde  ', [3, 7], [])).toBe(true)
  })

  test('should be true when value is a string with whitespaces and longest defined length', () => {
    expect(between(' abcdefg  ', [3, 7], [])).toBe(true)
  })

  test('should be true when value is a numeric string, numeric rules, equal to smallest defined size', () => {
    expect(between('3', [3, 7], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be true when value is a numeric string, numeric rules, between smallest and biggest defined sizes', () => {
    expect(between('5', [3, 7], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be true when value is a numeric string, numeric rules, equal to biggest defined size', () => {
    expect(between('7', [3, 7], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be false when value is a numeric string, numeric rules, smaller than smallest defined size', () => {
    expect(between('2', [3, 7], [{ title: 'numeric', params: [] }])).toBe(false)
  })

  test('should be false when value is a numeric string, numeric rules, bigger than biggest defined size', () => {
    expect(between('8', [3, 7], [{ title: 'numeric', params: [] }])).toBe(false)
  })

  test('should be true when value is an array equal to smallest defined size', () => {
    expect(between([1, 2, 3], [3, 7], [])).toBe(true)
  })

  test('should be true when value is an array between smallest and biggest defined sizes', () => {
    expect(between([1, 2, 3, 4, 5], [3, 7], [])).toBe(true)
  })

  test('should be true when value is an array equal to biggest defined size', () => {
    expect(between([1, 2, 3, 4, 5, 6, 7], [3, 7], [])).toBe(true)
  })

  test('should be false when value is an array smaller than smallest defined size', () => {
    expect(between([1, 2], [3, 7], [])).toBe(false)
  })

  test('should be false when value is an array bigger than biggest defined size', () => {
    expect(between([1, 2, 3, 4, 5, 6, 7, 8], [3, 7], [])).toBe(false)
  })
})
