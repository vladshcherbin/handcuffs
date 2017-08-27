import between from '../../src/rules/between'

describe('between rule', () => {
  test('should be false when value is a string with length more than defined length', () => {
    expect(between('asdad', [3, 4], [])).toBe(false)
  })

  test('should be true when value is a string with length equal to defined min length', () => {
    expect(between('anc', [3, 5], [])).toBe(true)
  })

  test('should be true when value is a string with length between defined length', () => {
    expect(between('ancf', [3, 5], [])).toBe(true)
  })

  test('should be true when value is a string with length equal to defined max length', () => {
    expect(between('ancfs', [3, 5], [])).toBe(true)
  })

  test('should be false when value is a string with number, numeric rules, more than defined length', () => {
    expect(between('123', [50, 100], [{ title: 'numeric', params: [] }])).toBe(false)
  })

  test('should be true when value is a string with number, numeric rules, between defined length', () => {
    expect(between('3', [1, 5], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be true when value is an array with length between defined length', () => {
    expect(between([1, 2, 3], [1, 5], [])).toBe(true)
  })

  test('should be false when value is an array with length more than defined length', () => {
    expect(between([1, 2, 3], [1, 2], [])).toBe(false)
  })
})
