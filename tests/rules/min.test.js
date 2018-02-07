import min from '../../src/rules/min'

describe('min rule', () => {
  test('should throw when rule params not provided', () => {
    expect(() => { min('abc') }).toThrow()
  })

  test('should be true when value is a string equal to defined length', () => {
    expect(min('abc', [3], [])).toBe(true)
  })

  test('should be true when value is a string longer than defined length', () => {
    expect(min('abcd', [3], [])).toBe(true)
  })

  test('should be false when value is a string shorter than defined length', () => {
    expect(min('a', [3], [])).toBe(false)
  })

  test('should be false when value is a string with whitespaces, shorter than defined length', () => {
    expect(min('a  ', [3], [])).toBe(false)
  })

  test('should be true when value is a numeric string, numeric rules, equal to defined size', () => {
    expect(min('3', [3], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be true when value is a numeric string, numeric rules, more than defined size', () => {
    expect(min('4', [3], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be false when value is a numeric string, numeric rules, less than defined size', () => {
    expect(min('2', [3], [{ title: 'numeric', params: [] }])).toBe(false)
  })

  test('should be true when value is an array equal to defined size', () => {
    expect(min([1, 2, 3], [3], [])).toBe(true)
  })

  test('should be true when value is an array bigger than defined size', () => {
    expect(min([1, 2, 3, 4], [3], [])).toBe(true)
  })

  test('should be false when value is an array smaller than defined size', () => {
    expect(min([1, 2], [3], [])).toBe(false)
  })
})
