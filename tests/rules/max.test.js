import max from '../../src/rules/max'

describe('max rule', () => {
  test('should throw when rule params not provided', () => {
    expect(() => { max('abc') }).toThrow()
  })

  test('should be true when value is a string equal to defined length', () => {
    expect(max('abc', [3], [])).toBe(true)
  })

  test('should be true when value is a string shorter than defined length', () => {
    expect(max('ad', [3], [])).toBe(true)
  })

  test('should be false when value is a string longer than defined length', () => {
    expect(max('abcd', [3], [])).toBe(false)
  })

  test('should be true when value is a string with whitespaces, shorter than defined length', () => {
    expect(max('a  ', [3], [])).toBe(true)
  })

  test('should be true when value is a numeric string, numeric rules, equal to defined size', () => {
    expect(max('3', [3], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be true when value is a numeric string, numeric rules, less than defined size', () => {
    expect(max('2', [3], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be false when value is a numeric string, numeric rules, more than defined size', () => {
    expect(max('4', [3], [{ title: 'numeric', params: [] }])).toBe(false)
  })

  test('should be true when value is an array equal to defined size', () => {
    expect(max([1, 2, 3], [3], [])).toBe(true)
  })

  test('should be true when value is an array smaller than defined size', () => {
    expect(max([1, 2], [3], [])).toBe(true)
  })

  test('should be false when value is an array bigger than defined size', () => {
    expect(max([1, 2, 3, 4], [3], [])).toBe(false)
  })
})
