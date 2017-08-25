import min from '../../src/rules/min'

describe('min rule', () => {
  test('should be false when value is a string with length less than defined length', () => {
    expect(min('3', [3], [])).toBe(false)
  })

  test('should be true when value is a string with length equal or more than defined length', () => {
    expect(min('anc', [3], [])).toBe(true)
  })

  test('should be false when value is a string with number, numeric rules, less than defined length', () => {
    expect(min('2', [3], [{ title: 'numeric', params: [] }])).toBe(false)
  })

  test('should be true when value is a string with number, numeric rules, equal or more than defined length', () => {
    expect(min('5', [3], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be true when value is an array with length equal or more than defined length', () => {
    expect(min([1, 2, 3, 4], [3], [])).toBe(true)
  })

  test('should be false when value is an array with length less than defined length', () => {
    expect(min([1, 2], [3], [])).toBe(false)
  })
})
