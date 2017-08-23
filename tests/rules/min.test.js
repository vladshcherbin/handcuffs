import min from '../../src/rules/min'

describe('min rule', () => {
  test('should be true when value is a string with more than enough length', () => {
    expect(min('abc', [2], [])).toBe(true)
  })

  test('should be true when value is a string with exactly enough length', () => {
    expect(min('ab', [2], [])).toBe(true)
  })

  test('should be false when value is a string with not enough length', () => {
    expect(min('a', [2], [])).toBe(false)
  })

  test('should be true when value is a string with a number, more than min param and with numeric rules', () => {
    expect(min('11', [10], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be true when value is a string with a number, same as min param and with numeric rules', () => {
    expect(min('10.5', [10.5], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be false when value is a string with a number, less than min param and with numeric rules', () => {
    expect(min('9', [10], [{ title: 'numeric', params: [] }])).toBe(false)
  })

  test('should be false when value is a string with a number, more than min param and without numeric rules', () => {
    expect(min('10', [10], [])).toBe(false)
  })

  test('should be false when value is a string with a number, same as min param and without numeric rules', () => {
    expect(min('10', [10], [])).toBe(false)
  })

  test('should be false when value is an empty string', () => {
    expect(min('', [0.01], [])).toBe(false)
  })

  test('should be true when value is a number, more than min param and with numeric rules', () => {
    expect(min(0.05, [0.04], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be true when value is a number, same as min param and with numeric rules', () => {
    expect(min(0.05, [0.05], [{ title: 'numeric', params: [] }])).toBe(true)
  })

  test('should be false when value is a number, less than min param and with numeric rules', () => {
    expect(min(0.04, [0.05], [{ title: 'numeric', params: [] }])).toBe(false)
  })

  test('should be false when value is a number, more than min param and without numeric rules', () => {
    expect(min(9, [10], [])).toBe(false)
  })

  test('should be true when value is an array with length more than min param', () => {
    expect(min(['Jack', 'Susan'], [1], [])).toBe(true)
  })

  test('should be true when value is an array with length same as min param', () => {
    expect(min(['Jack'], [1], [])).toBe(true)
  })

  test('should be false when value is an array with length less than min param', () => {
    expect(min(['Jack'], [2], [])).toBe(false)
  })

  test('should throw error if min param is not provided', () => {
    expect(() => {
      min(2)
    }).toThrowError()
  })

  test('should not throw error if min param is provided', () => {
    expect(() => {
      min(2, [0, 1], [])
    }).not.toThrowError()
  })
})
