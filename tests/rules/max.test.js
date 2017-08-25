import max from '../../src/rules/max'

describe('max rule', () => {
  test('should be false when value is a string with length more than defined length', () => {
    expect(max('aslksd', [3], [])).toBe(false)
  })

  test('should be true when value is a string with length equal or less than defined length', () => {
    expect(max('anc', [3], [])).toBe(true)
  })

  test('should be false when value is a string with number, numeric rules, more than defined length', () => {
    expect(max('211', [100], [{ title: 'numeric', params: [] }])).toBe(false)
  })

  test('should be true when value is a string with number, numeric rules, equal or less than defined length', () => {
    expect(max('22', [33], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be true when value is an array with length equal or less than defined length', () => {
    expect(max([1, 2, 3], [4], [])).toBe(true)
  })

  test('should be false when value is an array with length more than defined length', () => {
    expect(max([1, 2, 3], [2], [])).toBe(false)
  })
})
